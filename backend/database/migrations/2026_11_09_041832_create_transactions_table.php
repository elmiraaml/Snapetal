<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('transactions', function (Blueprint $table) {
        $table->id();
        $table->foreignId('template_id')->constrained('templates')->onDelete('cascade');
        // User yang memakai template (bisa null jika user tidak login)
        $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
        $table->decimal('amount', 12, 2); // Royalti untuk creator
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
