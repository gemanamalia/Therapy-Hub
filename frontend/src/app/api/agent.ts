import axios, { AxiosError, AxiosResponse } from "axios";
import { toast} from "react-toastify";
import { PaginatedResponse } from "../models/pagination";
import { router } from "../router/Routes";
import { store } from "../store/configureStore";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep();
    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
        return response;
    }
    return response
}, (error: AxiosError) => {
    // console.log('caught by interceptor');
    const {data, status} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 403:
            toast.error('You are not allowed to do that');
            break;
        case 500:
            router.navigate('/server-error', {state: {error: data}});
            break;
        default:
            break;
    }

    return Promise.reject(error.response);
})

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
    postForm: (url: string, data: FormData) => axios.post(url, data, {
        headers:{'Content-type': 'multipart/form-data'}
    }).then(responseBody),
    putForm: (url: string, data: FormData) => axios.put(url, data, {
        headers:{'Content-type': 'multipart/form-data'}
    }).then(responseBody)
}

function createFormData(item: any) {
    let formData = new FormData();
    for (const key in item) {
        formData.append(key, item[key])
    }
    return formData;
}

const Admin = {
    createProduct: (product: any) => requests.postForm('products', createFormData(product)),
    updateProduct: (product: any) => requests.putForm('products', createFormData(product)),
    deleteProduct: (id: number) => requests.delete(`products/${id}`),
    deleteUser: (id: number) => requests.delete(`account/${id}`)
}

const Catalog = {
    list: (params: URLSearchParams) => requests.get('products', params),
    details: (id: number) => requests.get(`products/${id}`),
    fetchFilters: () => requests.get('products/filters')
}

const TestErrors = {
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/unauthorised'),
    get404Error: () => requests.get('buggy/not-found'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error'),
}

const Basket = {
    get: () => requests.get('basket'),
    addItem: (productId: number, quantity=1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity=1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
}

const Account = {
    login: (values: any) => requests.post('account/login', values),
    register: (values: any) => requests.post('account/register', values),
    currentUser: () => requests.get('account/currentUser'),
    fetchAddress: () => requests.get('account/savedAddress'),
    fetchPortofolio: () => requests.get('account/portofolio'),
    savePortofolio: (values: any) => requests.post('account/savePortofolio', values),
    getDoctors:() => requests.get('account/doctors'),
    getPortofolioByUserId:(id: number) => requests.get(`account/${id}`),
    getUserId:() => requests.get('account/userId'),
    getUserRole:() => requests.get('account/userRole'),
    getAllUsers:() => requests.get('account/users')
}

const Orders = {
    list: () => requests.get('orders'),
    fetch: (id: number) => requests.get(`orders/${id}`),
    create: (values: any) => requests.post('orders', values)
}

const Payments = { 
    createPaymentIntent: () => requests.post('payments', {})
}

const Appointment = {
    getAppointmentsByUserId:(id: number) => requests.get(`appointment/${id}`),
    addAppointment:(day: string, start: string, end: string, doctorId: number, doctorName: string)  => requests.post(`appointment/saveUserAppointment?day=${day}&start=${start}&end=${end}&doctorId=${doctorId}&doctorName=${doctorName}`, {}),
    deleteUserAppointment:(id: number, username: string)  => requests.delete(`appointment/deleteUserAppointment?id=${id}&username=${username}`)
}


const Booking = {
    getBookingssByUserId:(id: number) => requests.get(`booking/${id}`),
    saveBookingToUser:(day: string, start: string, end: string, doctorId: number, doctorName: string) => requests.post(`booking/saveUserBooking?day=${day}&start=${start}&end=${end}&doctorId=${doctorId}&doctorName=${doctorName}`, {}),
    saveBookingToDoctor:(name:string, day: string, start: string, end: string, partnerId: number, partnerName: string) => requests.post(`booking/saveDoctorBooking?username=${name}&day=${day}&start=${start}&end=${end}&partnerId=${partnerId}&partnerName=${partnerName}`, {})
}

const Feedback = {
    getFeedbackByDoctorId:(id: number) => requests.get(`feedback/${id}`),
    addFeedback:(text: string, doctorId: number) => requests.post(`feedback?text=${text}&doctorId=${doctorId}`, {})
}

const agent = {
    Catalog,
    TestErrors,
    Basket,
    Account,
    Orders, 
    Payments,
    Admin, 
    Appointment,
    Booking,
    Feedback
}

export default agent;