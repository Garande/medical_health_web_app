<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->string('firstName')->nullable();
            $table->string('lastName')->nullable();
            $table->string('gender')->nullable();
            $table->date('dateOfBirth')->nullable();
            $table->string('primaryCarePhysicianFirstName')->nullable();
            $table->string('primaryCarePhysicianLastName')->nullable();
            $table->string('currentTherapistFirstName')->nullable();
            $table->string('currentTherapistLastName')->nullable();
            $table->string('currentTherapistPhoneNumber')->nullable();
            $table->json('currentSymptoms')->nullable();
            $table->string('previousDeathFeelings')->nullable();
            $table->string('currentDeathFeelings')->nullable();
            $table->string('deathFeelingsFrequency')->nullable();
            $table->date('lastDeathFeelingsDate')->nullable();
            $table->float('weight')->nullable();
            $table->float('height')->nullable();
            $table->string('medicalProblems')->nullable();
            $table->string('pastMedicalProblems')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('patients');
    }
};
