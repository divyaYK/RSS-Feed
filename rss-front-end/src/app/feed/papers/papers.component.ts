import { Component, OnInit, OnDestroy } from '@angular/core';
import { Paper } from './paper.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-papers',
  templateUrl: './papers.component.html',
  styleUrls: ['./papers.component.css']
})
export class PapersComponent implements OnInit, OnDestroy {
  papers: Paper[] = [];
  constructor(private http: HttpClient, private authService: AuthService) {}

  getPosts() {
    const config = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Auth-token', this.authService.getToken());
    this.http
      .get('http://localhost:6523/api/papers/', { headers: config })
      .subscribe((paperData) => {
        console.log(paperData);
        const fetchedData = JSON.stringify(paperData);
        const fetchedDataJson = JSON.parse(fetchedData);
        fetchedDataJson.forEach((paper) => {
          const newPaper: Paper = {
            title: paper.title,
            publicationDate: paper.publicationDate,
            link: paper.link,
            authors: paper.authors
          };
          this.papers.push(newPaper);
        });
      });
  }

  // getPostsByTitle(title: string) {
  //   this.papers = [];
  //   const config = new HttpHeaders()
  //     .set('Content-Type', 'application/json')
  //     .set('Accept', 'application/json')
  //     .set('Auth-token', this.authService.getToken());
  //   const data = { title };
  //   this.http
  //     .post('http://localhost:6523/api/papers/', JSON.stringify(data), { headers: config })
  //     .subscribe((paperData) => {
  //       console.log(paperData);
  //       const fetchedData = JSON.stringify(paperData);
  //       const fetchedDataJson = JSON.parse(fetchedData);
  //       fetchedDataJson.forEach((paper) => {
  //         const newPaper: Paper = {
  //           title: paper.title,
  //           publicationDate: paper.publicationDate,
  //           link: paper.link,
  //           authors: paper.authors
  //         };
  //         this.papers.push(newPaper);
  //       });
  //     });
  // }

  // getPostsByDate(date: Date) {
  //   this.papers = [];
  //   const config = new HttpHeaders()
  //     .set('Content-Type', 'application/json')
  //     .set('Accept', 'application/json')
  //     .set('Auth-token', this.authService.getToken());
  //   const data = { date };
  //   this.http
  //     .post('http://localhost:6523/api/papers/', JSON.stringify(data), { headers: config })
  //     .subscribe((paperData) => {
  //       console.log(paperData);
  //       const fetchedData = JSON.stringify(paperData);
  //       const fetchedDataJson = JSON.parse(fetchedData);
  //       fetchedDataJson.forEach((paper) => {
  //         const newPaper: Paper = {
  //           title: paper.title,
  //           publicationDate: paper.publicationDate,
  //           link: paper.link,
  //           authors: paper.authors
  //         };
  //         this.papers.push(newPaper);
  //       });
  //     });
  // }

  // getPostsByDateRange(startDate: Date, endDate: Date) {
  //   this.papers = [];
  //   const config = new HttpHeaders()
  //     .set('Content-Type', 'application/json')
  //     .set('Accept', 'application/json')
  //     .set('Auth-token', this.authService.getToken());
  //   const data = { startDate, endDate };
  //   this.http
  //     .post('http://localhost:6523/api/papers/', JSON.stringify(data), { headers: config })
  //     .subscribe((paperData) => {
  //       console.log(paperData);
  //       const fetchedData = JSON.stringify(paperData);
  //       const fetchedDataJson = JSON.parse(fetchedData);
  //       fetchedDataJson.forEach((paper) => {
  //         const newPaper: Paper = {
  //           title: paper.title,
  //           publicationDate: paper.publicationDate,
  //           link: paper.link,
  //           authors: paper.authors
  //         };
  //         this.papers.push(newPaper);
  //       });
  //     });
  // }

  ngOnInit(): void {
    this.getPosts();
  }

  ngOnDestroy(): void {
    //   this.authService.unsubscribe();
  }
}
