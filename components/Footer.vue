<template>
<footer class="bg-[#090E34] py-8 mt-2">
    <div class="container mx-auto px-4">
 
    <!-- Footer Content -->
    <div class="flex flex-wrap text-white py-8">
        <!-- Logo and Description -->
        <div class="w-full md:w-1/3 mb-6 md:mb-0">
        <div class="mb-6">
           <MyUniversityLogo class="w-48"/>
        </div>
        <p class="text-gray-400">Trường học cam kết mang đến dịch vụ học tập tốt nhất cho sinh viên</p>
        <div class="mt-4">
            <span class="font-semibold text-lg text-white">Follow us</span>
            <div class="flex space-x-4 mt-2">
            <a href="#" class="bg-blue-600 rounded-full p-2 text-white">
                <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" class="bg-blue-400 rounded-full p-2 text-white">
                <i class="fab fa-twitter"></i>
            </a>
            <a href="#" class="bg-red-600 rounded-full p-2 text-white">
                <i class="fab fa-google-plus-g"></i>
            </a>
            </div>
        </div>
        </div>

        <!-- Useful Links -->
        <div class="w-full md:w-1/3 mb-6 md:mb-0">
        <h3 class="font-semibold text-xl mb-6 text-white">Useful Links</h3>
        <ul class="flex flex-wrap">
            <li class="w-1/2 mb-3"><a href="#" class="text-gray-400 hover:text-orange-500">Home</a></li>
            <li class="w-1/2 mb-3"><a href="#" class="text-gray-400 hover:text-orange-500">About</a></li>
            <li class="w-1/2 mb-3"><a href="#" class="text-gray-400 hover:text-orange-500">Services</a></li>
            <li class="w-1/2 mb-3"><a href="#" class="text-gray-400 hover:text-orange-500">Portfolio</a></li>
            <li class="w-1/2 mb-3"><a href="#" class="text-gray-400 hover:text-orange-500">Contact</a></li>
            <li class="w-1/2 mb-3"><a href="#" class="text-gray-400 hover:text-orange-500">News</a></li>
        </ul>
        </div>

        <!-- Subscribe Form -->
        <div class="w-full md:w-1/3">
        <h3 class="font-semibold text-xl mb-6 text-white">Subscribe</h3>
        <p class="text-gray-400 mb-6">Don’t miss to subscribe to our new feeds, kindly fill the form below.</p>
        <form class="relative">
            <input type="text" placeholder="Email Address" class="w-full p-3 bg-gray-800 text-white border-none outline-none">
            <button class="absolute right-0 top-0 bg-orange-500 p-3">
            <i class="fab fa-telegram-plane text-white"></i>
            </button>
        </form>
        </div>
    </div>
    </div>

    <!-- Copyright Section -->
    <div class="bg-gray-900 py-4 text-gray-300">
        <div class="container mx-auto px-4 flex flex-wrap justify-between">
            <p class="w-full md:w-auto text-center md:text-left text-gray-300">&copy; 2024, All Right Reserved <a href="#" class="text-orange-500">LiveALearn Team</a></p>
            <ul class="w-full md:w-auto text-center md:text-right space-x-4">
                <li class="inline-block"><a href="#" class="hover:text-orange-500">Home</a></li>
                <li class="inline-block"><a href="#" class="hover:text-orange-500">Terms</a></li>
                <li class="inline-block"><a href="#" class="hover:text-orange-500">Privacy</a></li>
                <li class="inline-block"><a href="#" class="hover:text-orange-500">Contact</a></li>
            </ul>
        </div>
    </div>
</footer>
</template>

<script setup>
import MyUniversityLogo from '@/assets/icons/light_logo.svg'
</script>

<style scoped>
/* Add any additional styling if required */
</style>  