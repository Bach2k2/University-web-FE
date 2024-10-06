<template>
    <div class="pop-up bg-white rounded shadow-md relative">
        <!-- <Loading v-if="loading" style="min-height: 350px; background: white" /> -->
        <div class="w-full h-full flex flex-col">
            <footer class="px-4 py-2 w-full border-b">
                <h1 class="text-xl text-center text-gray-700 w-full">Login</h1>
            </footer>
            <section class="w-full px-4 py-2 flex flex-col">
                <div class="my-1 w-full">
                    <label class="text-sm text-gray-700" for="">Email</label>
                    <input placeholder="abc@xyz.opn" type="text" v-model="form.email" class="
                w-full
                rounded
                border
                py-2
                px-2
                bg-gray-50
                text-sm
                focus:border-2 focus:outline-none
              " :class="{ 'border-red-400': formError.email }" />
                </div>
                <div class="my-1 w-full">
                    <label class="text-sm text-gray-700" for="">Password</label>
                    <input placeholder="more than 9 digits" type="password" v-model="form.password" class="
                w-full
                rounded
                border
                py-2
                px-2
                bg-gray-50
                text-sm
                focus:border-2 focus:outline-none
              " :class="{ 'border-red-400': formError.password }" />
                </div>
                <div>
                    <pre v-if="error">
                            {{ error }}
                      </pre>
                </div>
            </section>
            <footer class="px-4 py-2 w-full border-t flex items-center justify-between">
                <button @click="close" class="
              py-2
              px-4
              bg-primary
              text-white
              opacity-80
              hover:opacity-100
              rounded
              shadow
            ">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 rotate--90" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 7l4-4m0 0l4 4m-4-4v18" />
                    </svg>
                </button>

                <button @click="submit" class="
              py-2
              px-4
              bg-primary
              text-white
              opacity-80
              hover:opacity-100
              rounded
              shadow
            ">
                    submit
                </button>
            </footer>
        </div>
    </div>
</template>
<script setup>
import Loading from "./loading.vue";
const loading = ref(false)
const form = reactive({
    email: "",
    password: "",
})

onMounted(() => {
    document.querySelector("body").classList.add("stop-scrolling");
})
const submit = async () => {

    this.loading = true;
    try {
        // var response = await axios.post(`${this.baseUrl}/login`, {
        var response = await this.$axios.post(`http:/192.168.43.236/login`, {
            email: this.form.email,
            password: this.form.password,
        });
        console.log(response);
        window.localStorage.setItem("x-auth-token", response.data.token);
        // this.$store.dispatch('setUser',response.data)
        // this.loading=false
        this.$emit("loggedIn", response.data);
    } catch (error) {
        console.log(error);
        this.loading = false;
        this.error = error;
        this.$emit("error", error);
    }

}
const close = () => {
    emit("close");
},
//   const inputValidation() {
//     // email
//     if (
//       !this.form.email ||
//       !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/.test(this.form.email)
//     ) {
//       this.formError.email = true;
//        this.toast("warning", "Invalid email")


//       return false;
//     }
//     if (this.form.password.length < 6) {
//       this.formError.password = true;
//        this.toast("warning", "Password must be more than 6 digits")

//       return false;
//     }
//     return true;
//   },
//         toast(type, message){
//         this.$toast(message, {
//         position: "top-right",
//         timeout: 2500,
//         transition :'Vue-Toastification__bounce',
//         closeButton: "button",
//         icon: true,
//         type: type
//     });
// },

// beforeDestroy() {
//     document.querySelector("body").classList.remove("stop-scrolling");
// }
</script>
<style>
.pop-up {
    width: 35vw;
}

.rotate--90 {
    transform: rotate(-90deg);
}

.bg-primary {
    background: rgb(19, 41, 59);
}

@media (max-width: 992px) {
    .pop-up {
        width: 45vw;
    }
}

@media (max-width: 768px) {
    .pop-up {
        width: 50vw;
    }
}

@media (max-width: 640px) {
    .pop-up {
        width: 60vw;
    }
}

@media (max-width: 500px) {
    .pop-up {
        width: 70vw;
    }
}

@media (max-width: 425px) {
    .pop-up {
        width: 80vw;
    }
}
</style>