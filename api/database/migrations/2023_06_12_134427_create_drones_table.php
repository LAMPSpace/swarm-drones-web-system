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
        Schema::create('drones', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('image', 512)->nullable();
            $table->enum('is_connected', ['N', 'Y'])->default('N');
            $table->foreignId('swarm_id')->constrained('swarms');
            $table->foreignId('master_id')->constrained('drones');
            $table->json('last_location')->nullable();
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
        Schema::dropIfExists('drones');
    }
};
