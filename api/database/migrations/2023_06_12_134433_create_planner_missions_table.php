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
        Schema::create('planner_missions', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('swarm_id')->constrained('swarms');
            $table->json('waypoints')->nullable();
            $table->json('config')->nullable();
            $table->enum('status', ['N', 'Y'])->default('N');
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
        Schema::dropIfExists('planner_missions');
    }
};
