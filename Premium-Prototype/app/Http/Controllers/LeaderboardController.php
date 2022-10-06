<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\ranking_data;

class LeaderboardController extends Controller
{
    function show()
 {
      $data= ranking_data::all();
      return view('leaderboard',compact('data'));

    //   return view('home',compact('data'))
}

}
