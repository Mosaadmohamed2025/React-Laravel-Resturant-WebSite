<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\InterFaces\sections\SectionRepositoryInterface;
use App\InterFaces\products\ProductsRepositoryInterface;
use App\InterFaces\resturants\ResturantRepositoryInterface;
use App\InterFaces\employees\EmployeeRepositoryInterface;
use App\InterFaces\orders\OrdersRepositoryInterface;
use App\Repository\sections\SectionRepository;
use App\Repository\products\ProductRepository;
use App\Repository\orders\OrderRepository;
use App\Repository\resturants\ResturantRepository;
use App\Repository\employees\EmployeeRepository;
use App\Repository\API\FrontendRepository;
use App\InterFaces\API\FrontendRepositoryInterface;
use App\Repository\API\AuthRepository;
use App\InterFaces\API\AuthRepositoryInterface;
use App\Repository\API\CheckoutRepository;
use App\InterFaces\API\CheckoutRepositoryInterface;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(SectionRepositoryInterface::class, SectionRepository::class);
        $this->app->bind(ProductsRepositoryInterface::class, ProductRepository::class);
        $this->app->bind(ResturantRepositoryInterface::class, ResturantRepository::class);
        $this->app->bind(EmployeeRepositoryInterface::class, EmployeeRepository::class);
        $this->app->bind(OrdersRepositoryInterface::class, OrderRepository::class);
        $this->app->bind(FrontendRepositoryInterface::class, FrontendRepository::class);
        $this->app->bind(AuthRepositoryInterface::class, AuthRepository::class);
        $this->app->bind(CheckoutRepositoryInterface::class, CheckoutRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
