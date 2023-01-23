<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    use HasFactory;

    protected $fillable = [
        'firstName', 'lastName', 'gender', 'dateOfBirth', 'primaryCarePhysicianFirstName', 'primaryCarePhysicianLastName', 'currentTherapistFirstName', 'currentTherapistLastName', 'currentTherapistPhoneNumber', 'currentSymptoms', 'previousDeathFeelings', 'currentDeathFeelings', 'deathFeelingsFrequency', 'lastDeathFeelingsDate', 'weight', 'height', 'medicalProblems', 'pastMedicalProblems'
    ];
}
