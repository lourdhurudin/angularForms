import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  loadedPosts = [];
  //length = this.loadedPosts.keys;
  isLoading = false;
  url = 'https://angulartest-5063a.firebaseio.com/posts.json'

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.http
      .post(
        this.url,
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    this.http.delete(this.url).subscribe(
      data => { 
        this.loadedPosts = [];
        console.log("deleting posts"+data);
    });
  }

  private fetchPosts() {
    this.isLoading=true;
    this.http
      .get(this.url)
      .pipe(
        map(responseData => {
          const postsArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        })
      )
      .subscribe(posts => {
        // ...
        this.loadedPosts = posts;
        console.log(posts);
        this.isLoading=false;
      });
    }
}
