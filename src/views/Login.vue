<script setup>

</script>

<template>
	<div class="h-screen flex flex-column items-center bg-[url(@/assets/login-bg.webp)] bg-no-repeat bg-right bg-cover justify-center">
		<div class="w-screen h-screen absolute top-0 left-0 bg-[#004aab] opacity-75 z-0"></div>
		<div class="w-96 bg-white/30 p-8 rounded-lg shadow-lg z-1 backdrop-blur-md">
			<div>
				<img src="@/assets/logo.webp" alt="Logo" class="mx-auto mb-4 w-24 h-20" />
			</div>
			<form>
				<div class="mb-4">
					<label for="username" class="block text-sm font-medium text-gray-700">Username</label>
					<input type="text" id="username" class="mt-1 bg-white block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
				</div>
				<div class="mb-6">
					<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
					<input type="password" id="password" class="mt-1 bg-white block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
				</div>
				<button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">Login</button>
			</form>
		</div>
	</div>
</template>
