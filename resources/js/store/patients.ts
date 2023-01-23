import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue'
import { useApi } from '../composable/useApi';
import { deleteDoc, fetchDocs, fetchSingleDoc, updateDoc, uploadDoc } from '../utils/apiUtils';


export interface PatientData {
    id?: number,
    Fname: string,
    Lname: string,
    Sex: string,
    Organisation: string,
    Tcourse: number,
    Duration: number,
    Tdate: string,
    Exdate: string,
    Trainner: string,
    Taddress: string,
    trainerId: number
}

export const usePatients = defineStore('patients', () => {
    const api = useApi();
    const loading = ref(false)
    const patients = ref<PatientData[]>([])

    const fetchPatients = async () => {
        loading.value = true;
        try {
            const response = await fetchDocs(api, `/api/patients`);
            // 
            patients.value = response.data;
        } catch (error) {
            // 
        } finally {
            loading.value = false;
        }
    }

    const fetchPatientById = async (id: number) => {
        try {
            const response = await fetchSingleDoc(api, `/api/patients/${id}`);
            const patient: PatientData = response.data;
            return patient;
        } catch (error) {
            // 
            return null;
        } finally {
            // loading.value = false;
        }
    }


    const savePatient = async (data: PatientData) => {
        if (loading.value) return;
        loading.value = true;
        try {

            if (data.id != undefined && data.id != null) {
                // update backend
                const response = await updateDoc(api, `/api/patients/${data.id}`, data);
                const option: PatientData = response.data;
                // update list
                const index = patients.value.findIndex((el) => el.id == option.id);
                if (index > -1) {
                    patients.value[index] = option;
                } else {
                    patients.value.push(option);
                }

            } else {
                // Create new
                const response = await uploadDoc(api, `/api/patients`, data);
                const option: PatientData = response.data;
                // update list
                const index = patients.value.findIndex((el) => el.id == option.id);
                if (index > -1) {
                    patients.value[index] = option;
                } else {
                    patients.value.push(option);
                }
            }
        } catch (error) {
            console.error(error);
            // 
        } finally {
            loading.value = false;
        }
    }


    const deletePatient = async (data: PatientData) => {
        try {
            const response = await deleteDoc(api, `/api/patients/${data.id}`);
            const option: PatientData = response.data;
            const index = patients.value.findIndex((el) => el.id == data.id);
            if (index > -1) {
                patients.value.splice(index, 1);
            }
        } catch (error) {
            // 
        } finally {
            loading.value = false;
        }
    }

    return {
        fetchPatients, savePatient, deletePatient, patients, fetchPatientById,
    } as const
})

// if (import.meta.hot) {
//     import.meta.hot.accept(acceptHMRUpdate(usePatients, import.meta.hot))
// }