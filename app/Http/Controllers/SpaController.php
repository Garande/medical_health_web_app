<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;

class SpaController extends BaseController
{
    /**
     * Renders the main app screen
     * 
     */
    public function __invoke()
    {
        return view('app');
    }
}