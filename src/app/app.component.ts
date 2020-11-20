import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { THEME } from './theme'
import { Store } from '@ngrx/store';
import { AppState } from './store';
import { UserInfo } from './shared/interfaces/global-info-interface';
import {Location} from '@angular/common';
import { Observable } from 'rxjs';
import cssVars from 'css-vars-ponyfill';
import { darkTheme, lightTheme } from './theme'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  darkMode: boolean = false;

  findDirectory(navs, linkName) {
    const link =  navs.reduce((acc, nextLink) => {
          const isInMainLink = nextLink.url === linkName;
          if (isInMainLink && nextLink.sublinks.length === 0) {
              return nextLink;
          }
          const finalSublink = nextLink.sublinks.find(sublink => sublink.url === linkName);
          if (finalSublink) {
              return finalSublink;
          }
          return acc;
      }, {});

      return link.directory;
  }

  constructor(public router: Router, private store: Store<AppState>, location: Location) {

    router.events.subscribe(val => {
      if (location.path() === '/administration/users') {
        this.directory = 'Users';
      } else if (location.path() === '/administration/lockboxes' || location.path() === '/administration/lockboxes/create') {
        this.directory = 'Lockboxes';
      } else if (location.path() === '/administration/users/create') {
        this.directory = 'User Information';
      } else if (location.path() != "") {
        let path = location.path().replace('/', '');
        this.directory = this.findDirectory(this.navLinks, path)
      } else {
        this.directory = "Home";
      }
    });
  }

  directory: string;
  logoPath: string = '../../../assets/icons/logo.svg'
  user: UserInfo;
  route: string;
  userParams = ['Logout']
  params$: Observable<any>;
  params;
  
  navLinks= [
    {
      name: 'Home',
      url: 'home',
      iconName: 'home',
      sublinks: [],
      directory: 'Home'
    },
    {
      name: 'Research',
      url: 'research/research-lockbox',
      iconName: 'search',
      sublinks: [
        {
          name: 'Encounter',
          url: 'research/research-encounter',
          directory: 'Research Encounter'
        },
        {
          name: 'Lockbox',
          url: 'research/research-lockbox',
          directory: 'Research Lockbox'
        },
        {
          name: 'Report Payment',
          url: 'research/research-report-payment',
          directory: 'Research Payments'
        },
        {
          name: 'Remittance',
          url: 'research/research-remittance',
          directory: 'Research Remittance'
        },
        {
          name: 'Bath print',
          url: 'research/research-bath-print',
          directory: 'Research Batch Print'
        }
      ],
    },
    {
      name: 'Reconciliation',
      url: 'reconciliation',
      iconName: 'assessment',
      sublinks: [],
      directory: 'Reconciliation'
    },
    {
      name: 'Matching',
      url: 'matching',
      iconName: 'work',
      sublinks: [],
      directory: 'Matching'
    },
    {
      name: 'Reports',
      url: 'reports',
      iconName: 'pie_chart',
      sublinks: [
        {
          name: 'Reports',
          url: 'reports',
          directory: 'Reports'
        },
        {
          name: 'Report Scheduler',
          url: 'reports/report-scheduler',
          directory: 'Report Scheduler'
        }
      ]
    },
    {
      name: 'Insights',
      url: 'insights',
      iconName: 'star',
      sublinks: [],
      directory: 'Insights'
    },
    {
      name: 'Workflow',
      url: 'workflow/remit-post',
      iconName: 'dashboard',
      sublinks: [
        {
          name: 'Remit Post',
          url: 'workflow/remit-post',
          directory: 'Remit Post'
        },
        {
          name: 'Correspondence',
          url: 'workflow/correspondence',
          directory: 'Correspondence'
        },
        {
          name: 'Denial Management',
          url: 'workflow/denial-management',
          directory: 'Workflow Denial'
        },
      ]
    },
    {
      name: 'Doc Management',
      url: 'doc-management',
      iconName: 'insert_drive_file',
      sublinks: [],
      directory: 'Doc Management'
    },
    {
      name: 'Analytics',
      url: 'analytics/partner-analytics',
      iconName: 'bubble_chart',
      sublinks: [
        {
          name: 'Partner Analytics',
          url: 'analytics/partner-analytics',
          directory: 'Partner Analytics'
        },
        {
          name: 'Reimbursement Analytics',
          url: 'analytics/reimbursement-analytics',
          directory: 'Reimbursement Analytics'
        },
        {
          name: 'Denial Analytics',
          url: 'analytics/denial-analytics',
          directory: 'Denial Analytics'
        }
      ]
    },
    {
      name: 'Administration',
      url: 'administration',
      iconName: 'business',
      sublinks: [],
      directory: 'Administration'
    },
  ]

  ngOnInit(): void {
    
    cssVars({
      include: 'style',
      onlyLegacy: false,
      watch: true,
      variables: this.darkMode ? darkTheme : lightTheme,
    });

    this.store.subscribe((store) => {
      this.user = store.login.user;
    })
  }
}
