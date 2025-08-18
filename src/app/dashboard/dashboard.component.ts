import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ChartData, ChartOptions } from 'chart.js';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  metrics: any[] = [];
  recentProjects: any[] = [];
  displayedColumns: string[] = ['title', 'status', 'startDate'];

  // Metrics
  totalProjects: number = 0;
  totalUsers: number = 0;
  totalManagers: number = 0;

  // Creators and their project counts for "Projects per Creator" chart
  creatorNames: string[] = [];
  projectsPerCreator: number[] = [];

  // Line Chart: Projects Over Time
  chartData: ChartData<'line'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: '#3f51b5',
      borderColor: '#303f9f',
      borderWidth: 1,
      label: 'Projects Over Time'
    }]
  };
  chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        onClick: () => {} // Prevent toggling datasets
      }
    }
  };

  // Pie Chart: Managers vs Other Users
  chartDataPie: ChartData<'pie'> = {
    labels: ['Managers', 'Autres Utilisateurs'],
    datasets: [{
      data: [],
      backgroundColor: ['#3f51b5', '#f44336'],
      borderColor: ['#ffffff', '#ffffff'],
      borderWidth: 2,
      label: 'User Roles'
    }]
  };
  chartOptionsPie: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        onClick: () => {} // Prevent toggling datasets
      }
    }
  };

  // Bar Chart: Project Status Distribution
  chartDataBar: ChartData<'bar'> = {
    labels: ['En cours', 'Planifié', 'Terminé'],
    datasets: [{
      data: [],
      backgroundColor: ['#ff9800', '#4caf50', '#2196f3'],
      borderColor: ['#ff9800', '#4caf50', '#2196f3'],
      borderWidth: 1,
      label: 'Project Status'
    }]
  };
  chartOptionsBar: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  // Line Chart: Projects per Creator
  chartDataLine: ChartData<'line'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: 'rgba(76, 175, 80, 0.2)',
      borderColor: '#4caf50',
      borderWidth: 1,
      tension: 0.4,
      label: 'Projects per Creator'
    }]
  };
  chartOptionsLine: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        onClick: () => {} // Prevent toggling datasets
      }
    }
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    forkJoin({
      projects: this.http.get<any[]>('http://localhost:3001/projects'),
      users: this.http.get<any[]>('http://localhost:3001/users'),
      projectMembers: this.http.get<any[]>('http://localhost:3001/project-members')
    }).subscribe({
      next: ({ projects, users, projectMembers }) => {
        console.log('Raw Projects:', projects);
        console.log('Raw Users:', users);

        // Metrics
        this.totalProjects = projects.length;
        this.totalUsers = users.length;
        this.totalManagers = users.filter((u: { role: string }) => u.role && u.role.toLowerCase() === 'manager').length;

        this.metrics = [
          { title: 'Total Projects', value: this.totalProjects, icon: 'folder', color: '#3f51b5' },
          { title: 'Total Users', value: this.totalUsers, icon: 'people', color: '#ff9800' },
          { title: 'Managers', value: this.totalManagers, icon: 'supervisor_account', color: '#4caf50' }
        ];

        // Recent Projects
        this.recentProjects = [...projects].sort((a: { dateCreation: string }, b: { dateCreation: string }) => new Date(b.dateCreation).getTime() - new Date(a.dateCreation).getTime()).slice(0, 3);

        // Line Chart: Projects Over Time
        const projectsByMonth = this.groupByMonth(projects);
        this.chartData.labels = Object.keys(projectsByMonth);
        this.chartData.datasets[0].data = Object.values(projectsByMonth);
        console.log('Projects Over Time Data:', this.chartData);

        // Pie Chart: Managers vs Other Users
        this.chartDataPie.datasets[0].data = [this.totalManagers, this.totalUsers - this.totalManagers];
        console.log('User Roles Data:', this.chartDataPie);

        // Bar Chart: Project Status Distribution
        const activeProjects = projects.filter((p: { statut: string }) => p.statut && p.statut.toLowerCase() === 'en cours').length;
        const plannedProjects = projects.filter((p: { statut: string }) => p.statut && p.statut.toLowerCase() === 'planifié').length;
        const completedProjects = projects.filter((p: { statut: string }) => p.statut && p.statut.toLowerCase() === 'terminé').length;
        this.chartDataBar.datasets[0].data = [activeProjects, plannedProjects, completedProjects];
        console.log('Project Status Data:', this.chartDataBar);

        // Line Chart: Projects per Creator
        const creatorMap: { [key: string]: string } = {};
        users.forEach(user => {
          creatorMap[user.id] = `${user.prenom} ${user.nom}`;
        });

        const projectCounts: { [key: string]: number } = {};
        projects.forEach(project => {
          const creatorName = creatorMap[project.idCreateur] || 'Unknown';
          if (!projectCounts[creatorName]) {
            projectCounts[creatorName] = 0;
            this.creatorNames.push(creatorName);
          }
          projectCounts[creatorName]++;
        });

        this.projectsPerCreator = Object.values(projectCounts);
        this.chartDataLine.labels = this.creatorNames;
        this.chartDataLine.datasets[0].data = this.projectsPerCreator;
        console.log('Projects per Creator Data:', this.chartDataLine);

        // Force change detection and delay to ensure rendering
        setTimeout(() => {
          this.cdr.detectChanges();
          console.log('Change detection triggered');
        }, 0);
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      },
      complete: () => {
        console.log('Data fetch completed');
      }
    });
  }

  groupByMonth(projects: { dateCreation: string }[]): { [key: string]: number } {
    const months: { [key: string]: number } = {};
    projects.forEach((p: { dateCreation: string }) => {
      if (p.dateCreation) {
        const month = new Date(p.dateCreation).toLocaleString('default', { month: 'long', year: 'numeric' });
        months[month] = (months[month] || 0) + 1;
      }
    });
    return months;
  }

  navigateToProjects() {
    this.router.navigate(['/projects']);
  }
}