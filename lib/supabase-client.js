
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY

const supabaseClient = createClient(supabaseUrl, supabaseKey, {
    localStorage: AsyncStorage
});
console.log(process.env)
const getHouseUnit = async () => {
    let { data: house_unit, error } = await supabaseClient
        .from('house_unit')
        .select('*')

    return { house_unit, error }
}

const getAddress = async (unit_id) => {
    let { data: house_unit, error } = await supabaseClient
        .from('house_unit')
        .select('*')
        .eq("unit_id", unit_id)
    return { house_unit, error }
}

/**
 * 
 * @returns 
 */
const getAllAnnouncements = async () => {
    let { data: announcements, error } = await supabaseClient.from('announcements').select('*,administrators(name)').eq('status', 'published').order('publish_date', { ascending: false }).range(0, 9);
    return { announcements, error }
}

/**
 * 
 * @param {*} id
 * @returns 
 */
const getAnnouncementById = async (id) => {
    let { data, error } = await supabaseClient.from('announcements').select('*,administrators(name)').eq('id', id);
    return { announcement: data[0], error }
}

const getLatestAnnouncement = async () => {

    let { data, error } = await supabaseClient.from('announcements').select('*,administrators(name)').eq('status', 'published').order('created_at', { ascending: false }).limit(1)
    return { announcement: data[0], error }
}

/**
 * 
 *  @returns
 */
const getAllFeedbacks = async (resident_id) => {
    let { data: feedbacks, error } = await supabaseClient.from('feedbacks').select('*').eq('resident_id', resident_id).order('created_at', { ascending: false });
    return { feedbacks, error }
}

/**
 * @param {*} id
 * @returns 
 */
const getFeedbackById = async (id) => {
    let { data, error } = await supabaseClient.from('feedbacks').select('*').eq('id', id);
    return { feedback: data[0], error }
}


/**
 * @param {*} id
 * @returns
*/
const getRepliesFromAdministrator = async (feedbackID) => {

    let { data, error } = await supabaseClient.from('replies').select(`*,administrators(name)`).eq('feedback_id', feedbackID);
    return { reply: data[0], error }

}

/**
 * 
 * @returns
*/
const getAllUpcomingVisitors = async (resident_id) => {

    let { data: visitation, error } = await supabaseClient.from('visitation').select('*').eq('resident_id', resident_id).is('checkin_time', null);
    return { visitation, error }

}

/**
 * 
 * @returns
*/
const getAllVisitorsHistory = async (resident_id) => {

    let { data: visitation, error } = await supabaseClient.from('visitation').select('*').eq('resident_id', resident_id).not('checkin_time', 'is', null);
    return { visitation, error }

}

/**
 * @param {*} id
 * @returns
*/
const getVisitationById = async (id) => {
    let { data, error: visitError } = await supabaseClient.from('visitation').select(`*,security_guards(*),residents(*)`).eq('id', id);
    return { visitation: data[0], error: visitError }

}

/**
 * 
 * @returns 
 */
const getUpcomingVisitor = async (resident_id) => {
    let { data, error } = await supabaseClient.from('visitation').select('*').eq('resident_id', resident_id).is('checkin_time', null).order('visitation_date', { ascending: true }).order('visitation_time', { ascending: true }).limit(1);
    return { visitation: data[0], error }
}

/**
 * 
 * @param {*} accID 
 * @returns 
 */
const getResidentByID = async (accID) => {

    let { data, error } = await supabaseClient
        .from('residents')
        .select('*,residents_registration(proof)')
        .eq('account_id', accID)
    return { resident: data[0], error }
}

/**
 * 
 * @param {*} accID 
 * @returns 
 */
const getAccountByID = async (accID) => {

    let { data, error } = await supabaseClient
        .from('accounts')
        .select('*')
        .eq('id', accID)
    return { account: data[0], error }
}


/**
 * 
 * @param {*} updateMethod 
 */
const listenForFeedbackChanges = (updateMethod) => {

    const feedbacks = supabaseClient
        .from('feedbacks')
        .on('*', payload => {
            // console.log('Change received!', payload);
            updateMethod();
        })
        .subscribe()
}

/**
 * 
 * @param {*} updateMethod 
 * @param {*} updateMethod2 
 */
const listenForVisitationChanges = (updateMethod) => {

    const visitation = supabaseClient
        .from('visitation')
        .on('*', payload => {
            // console.log('Change received!', payload);
            updateMethod();
        })
        .subscribe()

}


/**
 * 
 * @param {*} updateMethod 
 */
const listenForAnnouncementChange = (updateMethod) => {

    const announcements = supabaseClient
        .from('announcements')
        .on('*', payload => {
            //   console.log('Change received!', payload)
            updateMethod();
        })
        .subscribe()

}

const listenForResidentChange = (updateMethod) => {

    const resident = supabaseClient
        .from('residents')
        .on('*', payload => {
            //   console.log('Change received!', payload)
            updateMethod();
        })
        .subscribe()
}


/**
 * 
 * @param {*} name 
 * @param {*} ic 
 * @param {*} phoneNumber 
 * @param {*} dateTime 
 * @param {*} carPlate 
 * @returns 
 */
const saveVisitor = async (name, ic, phoneNumber, carPlate, session_id, unitID, id, visitation_date, visitation_time) => {
    try {
        console.log(visitation_date)
        console.log(visitation_time)
        console.log(unitID)
        const { data, error } = await supabaseClient.from('visitation').insert([{ visitor_name: name, visitor_ic: ic, phone_no: phoneNumber, carplate: carPlate, resident_id: session_id, id: id, unit_id: unitID, visitation_date: visitation_date, visitation_time: visitation_time }]);
        return { error };
    } catch (error) {
        console.log(error.message)
    }
}

const saveVisitorSG = async (name, ic, phoneNumber, carPlate, session_id, unitID, id, date, time) => {
    try {
        const { data, error } = await supabaseClient.from('visitation').insert([{ visitor_name: name, visitor_ic: ic, phone_no: phoneNumber, unit_id: unitID, carplate: carPlate, security_id: session_id, id: id, checkin_date: date, checkin_time: time, visitation_date: date, visitation_time: time }]);
        return { error };
    } catch (error) {
        console.log(error.message)
    }
}

/**
 * 
 * @param {*} title 
 * @param {*} description 
 * @param {*} category 
 * @returns 
 */
const saveFeedback = async (id, title, description, category, resident_id, status) => {
    const { data, error } = await supabaseClient.from('feedbacks').insert([{ id: id, title: title, description: description, category: category, resident_id: resident_id, status }]);
    return { error };
}

/** */
const updateVisitation = async (checkin_time, checkin_date, securityID, id) => {
    const { data, error } = await supabaseClient.from('visitation').update({ checkin_time: checkin_time, checkin_date: checkin_date, security_id: securityID }).eq('id', id)
    return { error };
}

/**
 * 
 * @param {*} id 
 * @returns 
 */
const removeVisitor = async (id) => {

    const { data, error } = await supabaseClient
        .from('visitation')
        .delete()
        .eq('id', id)

    return { error };

}

/**
 * 
 * @param {*} email 
 * @param {*} password 
 * @returns 
 */
const signIn = async (email, password) => {

    // use email to check from account get account id, then get registration id from resident, then get status from registration

    let { data: account, error: accountError } = await supabaseClient
        .from('accounts')
        .select('id,account_type')
        .eq('email', email)

    if (account[0] == undefined) {
        accountError = { "message": "Email not found!" }
    } else {
        if (account[0].account_type == "management") {
            accountError = { "message": "Only resident and security guard allowed. " }
        }
    }


    if (account[0] != 0 && !accountError) {

        if (account[0].account_type == "resident") {

            let { data: resident, error: residentError } = await supabaseClient
                .from('residents')
                .select('residents_registration(status)')
                .eq('account_id', account[0].id)

            let status = resident[0].residents_registration.status

            if (status == "approved") {
                let { user, error: signInError } = await supabaseClient.auth.signIn({
                    email,
                    password
                })
                return { user, error: signInError };
            } else {
                residentError = { "message": "Your registration is not yet approved by management team. If you have any enquiry please email management team for more information." }
            }
            return { residents: resident[0], error: residentError }
        } else if (account[0].account_type == "security_guard") {
            let { user, error: signInError } = await supabaseClient.auth.signIn({
                email,
                password
            })
            return { user, error: signInError };
        }

    }

    return { accounts: account[0], error: accountError }
}

/**
 * 
 * @returns 
 */
const signOut = async () => {

    let { user, error } = await supabaseClient.auth.signOut();
    return { error };

}

/**
 * 
 * @param {*} email 
 * @param {*} password 
 * @param {*} accountType 
 * @returns 
 */
const signUp = async (email, password, account_type, status, image, name, ic, phoneNumber, carplate, unitID, address) => {

    //validation if unit id found in house unit, error and prompt user to reenter

    let { user, error: signUpError } = await supabaseClient.auth.api.signUpWithEmail(email, password)

    if (!signUpError) {

        const { data: account, error: accountError } = await supabaseClient.from('accounts').update({ account_type: account_type }).eq('email', email)
        console.log("Account " + JSON.stringify(account))

        if (!accountError) {

            // add proof to bucket
            const ext = image.substring(image.lastIndexOf(".") + 1);
            console.log("filename: " + image)
            // get filename
            const fileName = image.replace(/^.*[\\\/]/, "");
            console.log("hello" + fileName)
            var formData = new FormData();
            formData.append("files", {
                uri: image, name: fileName, type: image.type ? `image/${ext}` : `video/${ext}`,
            });

            // upload to supabase bucket
            const { data: img, error: bucketError } = await supabaseClient.storage.from("registration.proof").upload(fileName, formData);

            if (img) {

                //add to registration table
                const { data: registration, error: registrationError } = await supabaseClient.from('residents_registration')
                    .insert([{ status: status, proof: img }]);


                if (!registrationError) {

                    //check unit id

                    const { house_unit, error: checkError } = await getAddress(unitID);

                    if (house_unit.length <= 0) {
                        //add to house unit
                        const { data: unit, error: unitError } = await supabaseClient.from('house_unit')
                            .insert([
                                { unit_id: unitID, address: address },
                            ])
                        if (unitError) {
                            return { error: unitError }
                        }
                    }


                    if (!checkError) {
                        const { data: resident, error: residentError } = await supabaseClient
                            .from('residents')
                            .insert([
                                {
                                    name: name, ic: ic, phone_no: phoneNumber, carplate: carplate, unit_id: unitID, account_id: account[0]?.id, registration_id: registration[0]?.id
                                }
                            ])
                        return { error: residentError }
                    }
                    return { error: checkError }
                }
                return { error: registrationError }
            }
            return { error: bucketError }
        }

        return { error: accountError }
    }

    console.log("signup error: " + JSON.stringify(signUpError))
    return { error: signUpError };
}

const updateProfile = async (accID, phoneNo, carplate) => {

    const { data, error } = await supabaseClient
        .from('residents')
        .update({ phone_no: phoneNo, carplate: carplate })
        .eq('account_id', accID)

    return { error }

}

const resetPassword = async (password) => {
    //udpate user
    const { user, error } = await supabaseClient.auth.update({ password: password })
    console.log("reset")
    return { error };

}


export {
    supabaseClient, getHouseUnit, getAddress, getAllAnnouncements, getAllFeedbacks, getAllUpcomingVisitors, getAllVisitorsHistory, getVisitationById, getAnnouncementById, getFeedbackById, getRepliesFromAdministrator,
    saveVisitor, saveVisitorSG, saveFeedback, listenForFeedbackChanges, listenForVisitationChanges, listenForAnnouncementChange, listenForResidentChange, removeVisitor, getLatestAnnouncement,
    getUpcomingVisitor, updateVisitation, signIn, signUp, signOut, getResidentByID, getAccountByID, resetPassword, updateProfile
};