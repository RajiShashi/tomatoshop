import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  sidebarClick(): void {
    alert("jiii")
    // $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
    //   $("body").toggleClass("sidebar-toggled");
    //   $(".sidebar").toggleClass("toggled");
    //   if ($(".sidebar").hasClass("toggled")) {
    //     $('.sidebar .collapse').collapse('hide');
    //   };
    // });
  }

}
