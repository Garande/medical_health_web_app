<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $patient = Patient::all(['id', 'firstName', 'lastName', 'gender', 'dateOfBirth', 'primaryCarePhysicianFirstName', 'primaryCarePhysicianLastName', 'currentTherapistFirstName', 'currentTherapistLastName', 'currentTherapistPhoneNumber', 'currentSymptoms', 'previousDeathFeelings', 'currentDeathFeelings', 'deathFeelingsFrequency', 'lastDeathFeelingsDate', 'weight', 'height', 'medicalProblems', 'pastMedicalProblems']);
        return response()->json($patient);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $patient = Patient::create($request->post());

        return response()->json([
            'message' => 'Patient Created Successfully',
            'data' => $patient
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Patient  $patient
     * @return \Illuminate\Http\Response
     */
    public function show(Patient $patient)
    {
        //
        return response()->json($patient);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Patient  $patient
     * @return \Illuminate\Http\Response
     */
    public function edit(Patient $patient)
    {
        //
        $patient->edit();
        return response()->json([
            'message' => 'Patient updated successfully',
            'data' => $patient
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Patient  $patient
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Patient $patient)
    {
        //
        $patient->fill($request->post())->save();
        return response()->json([
            'message' => 'Patient Updated Successfully',
            'data' => $patient
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Patient  $patient
     * @return \Illuminate\Http\Response
     */
    public function destroy(Patient $patient)
    {
        //
        $patient->delete();
        return response()->json([
            'message' => 'Patient Deleted Successfully'
        ]);
    }
}
