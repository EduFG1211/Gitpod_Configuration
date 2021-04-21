
import React from "react";
import { Redirect } from "react-router";

let global_url = "https://3001-emerald-wildebeest-7m4h8xsp.ws-us03.gitpod.io/";


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			bearer_token: '',
			login: false,
			budget:[],
			services_data:[]

		},
		actions: {

			register_user: async (username, password, email,name, lastname,phone) => {
				const requestOptions = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({username:username, password:password,name:name, last_name:lastname, email:email, phone:phone})
				};
				fetch(global_url + "api/user", requestOptions)
					.then(response => response.json())
					.then(data => console.log(data));
			},

			login_user: async (username, password) => {
                let temp_token;
                console.log(username,password);
				const store = getStore();
				const requestOptions = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ username: username, password: password })
				};

				const result =await fetch(global_url + "api/login", requestOptions)
					        .then(response => response.json())
                            .then(data =>  temp_token=data.access_token);
                console.log(temp_token);
                setStore({bearer_token:temp_token})

				if (store.bearer_token.length > 0) {
					setStore({ login: true });
				}
				const requestOptions_budget = {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.bearer_token
					}
				};
				await fetch(global_url + "api/get-budget", requestOptions_budget)
					.then(response => response.json())
					.then(data => setStore({budget: data}));
			},

			updateBudget: async updated_budget_array => {

				const urlAPI = global_url + "api/update-budget";
				const updateOptions_budget = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + store.bearer_token.access_token
					},
					body: JSON.stringify([{service1_id:updated_budget_array[0],service2_id:updated_budget_array[1],service3_id:updated_budget_budget[2]}])
				};

				const result = await fetch(urlAPI,updateOptions_budget)
					.then(res => res.json())
					.then(data => console.log(data));
				
			},
			get_services_data: async () => {
				const urlAPI = global_url + "api/allserv";
				const get_services_data= {
					method: "GET",
					headers: {
						"Content-Type": "application/json"
					}
				};
				const result = await fetch(urlAPI,get_services_data)
					.then(res => res.json())
					.then(data => setStore({services_data:data}));
				}
			

			}


		}
	};


export default getState;