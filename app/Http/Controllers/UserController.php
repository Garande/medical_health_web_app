<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource
     * 
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // 
        $user = User::all(['name', 'email']);
        return response()->json($user);
    }

    /**
     * Show the form for creating a new resource
     * 
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // 
    }

    /**
     * Display the specified resource
     * 
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        // 
        return response()->json($user);
    }
}
