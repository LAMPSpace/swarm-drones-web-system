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
        Schema::create('swarms', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('image', 512)->nullable();
            $table->enum('is_connected', ['N', 'Y'])->default('N');
            $table->json('config')->nullable();
            $table->foreignId('owner_id')->constrained('users');
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
        Schema::dropIfExists('swarms');
    }
};
