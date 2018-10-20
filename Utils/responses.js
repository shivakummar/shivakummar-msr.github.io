
var STATUS_MSG ={
    SUCCESS: {
        CREATED: {
            statusCode:201,
            customMessage : 'Created Successfully',
            type : 'CREATED'
        },
        DEFAULT: {
            statusCode:200,
            customMessage : 'Success',
            type : 'DEFAULT'
        },
        UPDATED: {
            statusCode:200,
            customMessage : 'Updated Successfully',
            type : 'UPDATED'
        },
        LOGOUT: {
            statusCode:200,
            customMessage : 'Logged Out Successfully',
            type : 'LOGOUT'
        },
        DELETED: {
            statusCode:200,
            customMessage : 'Deleted Successfully',
            type : 'DELETED'
        },
        PassWord_Token_Send: {
            statusCode:200,
            customMessage : 'Your password reset request has been sent to your email id',
            type : 'UPDATED'
        }
        

    }
}
module.exports = {
    STATUS_MSG:STATUS_MSG,
    systemError: {
        statusCode: 500,
        status: 'error',
        message: 'Technical error ! Please try again later.'
    },
    bookDeleted : {
            status:'success', 
            statusCode : 200, 
            message:"Project deleted successfully." 
    },
    unAuthAccess: {
        statusCode: 108,
        status: 'error',
        message: 'Unauthorised access.'
    },
    emailAlreadyExists: {
        statusCode: 103,
        status: "warning",
        message: 'This Email is already exist.'
    },
    bookAlreadyExists: {
        statusCode: 103,
        status: "warning",
        message: 'This ProjectId is already exist.'
    },
    bookAlreadyAssigned: {
        statusCode: 103,
        status: "warning",
        message: 'This Project is already assigned.'
    },
    clientAlreadyExists: {
        statusCode: 103,
        status: "warning",
        message: 'This client is already exist.'
    },
    empIdAlreadyExists: {
        statusCode: 103,
        status: "warning",
        message: 'This Employee Id is already exist.'
    },
    contactAlreadyExists: {
        statusCode: 103,
        status: "warning",
        message: 'This contact number is already registered.'
    },
    emailNotExists: {
        statusCode: 103,
        status: "warning",
        message: 'Email is not registered with us.',
        responseType: "EMAIL_NOT_FOUND"
    },
     phnoenumberAlreadyExists: {
        statusCode: 400,
        status: "warning",
        message: 'Phone Number already registered.',
        responseType: "PHONE_ALREADY_EXISTS"
    },
     phoneNumberNotExists: {
        statusCode: 400,
        status: "warning",
        message: 'Phone Number not registered.',
        responseType: "PHONE_NOT_EXISTS"
    },
    registerSuccessfully: {
        statusCode: 200,
        status: "success",
        message: 'Your account has been registered successfully.A verification code has been sent to your Contact number.'
    },
    tokenNotExist: {
        statusCode: 400,
        status: "error",
        message: 'Invalid Token.',
        responseType:"TOKEN_NOT-VALID"
    },
    tokenExpired: {
        statusCode: 401,
        status: "warning",
        message: 'Token Expired.'
    },
    tokenVerified: {
        statusCode: 200,
        status: "success",
        message: 'Token has been verified'
    },
    forgetPassword: {
        statusCode: 200,
        status: "success",
        message: 'A verification code has been sent to your Contact number.'
    },
    resetpassword: {
        statusCode: 200,
        status: "success",
        message: 'A randomly generated password has been sent. Please use that to login and change your password.'
    },
    passwordUpdated: {
        statusCode: 200,
        status: "success",
        message: 'Password updated successfully.'
    },
    emailChanged: {
        statusCode: 200,
        status: "success",
        message: 'An OTP is sent to the registered email Id. Please use that to verify your email.'
    },
    phoneNumChanged: {
        statusCode: 200,
        status: "success",
        message: 'An OTP is sent to the registered phone number. Please use that to verify your phone number.'
    },
    emailUpdated: {
        statusCode: 200,
        status: "success",
        message: 'Email updated successfully.'
    },
    loginSuccessfull: {
        statusCode: 200,
        status: "success",
        message: 'Logged in successfully.'
    },
    logoutSuccessfull: {
        statusCode: 200,
        status: "success",
        message: 'Logged out successfully.'
    },
    invalidCredentials: {
        statusCode: 400,
        status: "error",
        message: 'Invalid credentials.'
    },
    accountNotConfirmed: {
        statusCode: 103,
        status: "warning",
        message: 'Your account is not confirmed.Please confirm verification link sent your registered email.'
    },
    alreadyExist: {
        statusCode: 103,
        status: "warning",
        message: 'Already exist.'
    },
    idNotExist: {
        statusCode: 103,
        status: "warning",
        message: 'Given id does not exists.'
    },
    jobIdNotExist: {
        statusCode: 103,
        status: "warning",
        message: 'Given id does not exists.'
    },
    profileUpdate: {
        statusCode: 200,
        status: "success",
        message: 'Profile successfully updated.'
    },
    suspended: {
        statusCode: 103,
        status: "warning",
        message: "Your account is suspended or deleted. Please contact admin for further support."
    },
    fileLengthExceeded: {
        statusCode: 103,
        status: "warning",
        message: "File size exceeds the maximum limit. Please upload the file of size less than 5MB."
    },
    fileNotFound: {
        statusCode: 404,
        status: "warning",
        message: "File not found."
    },
    onlyImagesAllowed: {
        statusCode: 103,
        status: "warning",
        message: "Files with 'jpg', 'jpeg' and 'png' formats are allowed."
    },
    onlyPdfAllowed: {
        statusCode: 103,
        status: "warning",
        message: "Resume should be in doc or pdf format."
    },
    fileWriteError:{
        statusCode: 103,
        status: "warning",
        message: "File write error."
    },
    fileChooseError:{
        statusCode: 103,
        status: "warning",
        message: "Please choose any file."
    },
    jobSaved:{
        statusCode: 200,
        status: "success",
        message: "Job saved successfully."
    },
    jobApplied:{
        statusCode: 400,
        status: "error",

    },
    otpNotValid:{
        statusCode: 400,
        status: "error",
        message: "Please enter the valid OTP.",
        responseType:"OTP_NOT_VALID"
    },
    oldAndNewPasswordMatch: {
        statusCode: 103,
        status: "warning",
        message: 'New password should be different than old password.'
    },
    oldPassIncorrect:{
        statusCode: 400,
        status: "error",
        message: "Old password entered is wrong."
    },
    invalidOperation:{
        statusCode: 103,
        status: "warning",
        message: "Invalid operation."
    },
    AccountCannotCreate: {
        statusCode: 103,
        status: "warning",
        message: "Account Cannot Be Created without email ID."
    },
    unauthorizedUser: {
        statusCode: 103,
        status: "warning",
        message: 'You are not an authorized user for this action.'
    },
    emailnotExistForRole: {
        statusCode: 103,
        status: "warning",
        message: 'Email does not exist.'
    },
    userNotExist: {
        statusCode: 103,
        status: "warning",
        message: 'User not exist.'
    },
    phonenumberNotExistForAuth: {
        statusCode: 103,
        status: "warning",
        message: 'PhoneNumber not exist for specific auth.',
        responseType: "AUTH_NOT_VALID"
    },
    forgetPasswordEmail: {
        statusCode: 200,
        status: "success",
        message: 'An OTP is sent to the registered email Id. Please use that OTP to access your account.'
    },
    vehicleCountExceeded: {
        statusCode: 103,
        status: "warning",
        message: 'Unable to add this vehicle. You cannot add more than 10 vehicles. Please remove some to add a new one.'
    },
    vehicleAlreadyPresent: {
        statusCode: 103,
        status: "warning",
        message: 'Unable to add this vehicle. The vehicle is already registered.',
    },
    vehicleAdded:{
        statusCode: 200,
        status: "success",
        message: "Vehicle added successfully."
    },
    vehicleUpdated:{
        statusCode: 200,
        status: "success",
        message: "Vehicle details updated successfully."
    },
    vehicleDeleted:{
        statusCode: 200,
        status: "success",
        message: "Vehicle details deleted successfully."
    },
    vehicleFetched:{
        statusCode: 200,
        status: "success",
        message: "Vehicles fetched successfully."
    },
    vehicleNotFound: {
        statusCode: 103,
        status: "warning",
        message: "Unable to find this vehicle details.",
    },
    actionNotAllowed: {
        statusCode: 103,
        status: "warning",
        message: "You are not allowed to perform this action.",
    },
    noVehicleAdded: {
        statusCode: 103,
        status: "warning",
        message: "No vehicle is added in your profile. Please add a vehicle first to perform this action.",
    },
    contactUs: {
        statusCode: 200,
        status: "success",
        message: 'Your enquiry has been submitted, we will get back to you soon.'
    },
    reportIssue: {
        statusCode: 200,
        status: "success",
        message: 'Your issue has been submitted successfully. We will contact you soon.'
    },
    requestBusinessCarPark: {
        statusCode: 200,
        status: "success",
        message: 'Your request has been submitted successfully. We will contact you soon.'
    },
    updateRadius: {
        statusCode: 200,
        status: "success",
        message: 'Your radius is updated successfully.'
    },
    fetchSpace:{
        statusCode: 200,
        status: "success",
        message: 'Parking space fetched successfully.'
    },
    space_add: {
        statusCode: 200,
        status: "success",
        message: 'Parking space added successfully.'
    },
    deleteSpace: {
        statusCode: 200,
        status: "success",
        message: 'Parking space deleted successfully.'
    },
    updateSpace: {
        statusCode: 200,
        status: "success",
        message: 'Parking space updated successfully.'
    },
    cardAdded: {
        statusCode: 200,
        status: "success",
        message: 'This card is successfully linked with your user account.'
    },
    defaultCardUpdated:{
        statusCode: 200,
        status: "success",
        message: 'This card is successfully set as your default card.'
    },
    cardFetched: {
        statusCode: 200,
        status: "success",
        message: 'Cards fetched successfully.'
    },
    cardDeleted:{
        statusCode: 200,
        status: "success",
        message: 'Card details removed successfully.'
    },
    stripeTokenExpired : {
        statusCode: 103,
        status: "warning",
        message: "There was an error in linking your account. Please enter card details again."
    },
    cardDetailsInvalid : {
        statusCode: 103,
        status: "warning",
        message: "The card details provided are either incorrect or the card is invalid."
    },
    cardInvalid: {
        statusCode: 103,
        status: "warning",
        message: "Payment failed. Card not accepted."
    },
    cardNotPresent: {
        statusCode: 103,
        status: "warning",
        message: "Unable to perform this operation. No card present under this user."
    },
    cardNotExists: {
        statusCode: 103,
        status: "warning",
        message: "The requested card does not exist."
    },
    messageSent: {
        statusCode: 200,
        status: "success",
        message: 'Message sent successfully.'
    },
    messageDeleted: {
        statusCode: 200,
        status: "success",
        message: 'Message deleted successfully.'
    },
    messageThreadFetched:{
        statusCode: 200,
        status: "success",
        message: 'Message thread fetched successfully.'
    },
    messageThreadNotExist:{
        statusCode: 103,
        status: "warning",
        message: "Unable to access this message thread. Message thread is deleted."
    },
    inboxFetched: {
        statusCode: 200,
        status: "success",
        message: 'User inbox fetched successfully.'
    },
    invalidExtendTime:{
        statusCode: 105,
        status: "error",
        message: 'Please select a valid end time.'
    },
    bookingCompleted: {
        statusCode: 201,
        status: "success",
        message: 'Booking request sent successfully.'
    },
    bookingAccepted: {
        statusCode: 200,
        status: "success",
        message: 'Booking request accepted successfully.'
    },
    bookingEnded: {
        statusCode: 200,
        status: "success",
        message: 'Booking ended successfully.'
    },
    bookingPaid:{
        statusCode: 200,
        status: "success",
        message: 'Payment completed successfully.'
    },
    bookingNotFound : {
        statusCode: 103,
        status: "warning",
        message: 'The requested booking data is either updated or deleted.'
    },
    bookingRejected : {
        statusCode: 103,
        status: "warning",
        message: 'Unable to process with this booking, as all the parking spaces are occupied for the provided duration.'
    },
    bookingDeleted : {
        statusCode: 200,
        status: "success",
        message: 'Booking deleted successfully.'
    },
    bookingNotCompleted:{
        statusCode: 103,
        status: "warning",
        message: 'Unable to perform this operation. The requested booking is not yet completed.'
    },
    bookingCancelled : {
        statusCode: 200,
        status: "success",
        message: 'Booking cancelled successfully.'
    },
    parkingSpaces: {
        statusCode: 200,
        status: "success",
        message: 'Parking Spaces fetched successfully.'
    },
    otpVerified: {
        statusCode: 200,
        status: "success",
        message: 'OTP verified successfully.'
    },
    INVALID_PARKING_ID: {
        statusCode: 400,
        status: "warning",
        message: 'Invalid parking id.',
        responseType: "INVALID_PARKING_ID"
    },
    PARKING_SPACE_IS_NOT_AVAILABLE: {
        statusCode: 400,
        status: "warning",
        message: 'Parking space is not available.',
        responseType: "PARKING_SPACE_IS_NOT_AVAILABLE"
    },
    is_available_current: {
        statusCode: 200,
        status: "success",
        message: "Your space is updated as un available today for upcoming users."
    },
    PARKING_SPACE_IS_NOT_UPDATED:{
        statusCode: 103,
        status: "warning",
        message: "You can't perform this action right now."
    },
    userAuthenticated: {
        statusCode: 200,
        status: "success",
        message: 'User authenticated successfully.'
    },
    userNotAuthenticated: {
        statusCode: 103,
        status: "warning",
        message: 'User not authenticated.'
    },
    parkingRequestError:{
        statusCode: 103,
        status: "warning",
        message: ''     //custom message
    },
    parkingRequestAccepted:{
        statusCode: 200,
        status: "success",
        message: 'Parking request accepted successfully.'
    },
    parkingRequestRejected:{
        statusCode: 202,
        status: "success",
        message: 'Parking request rejected successfully.'
    },
    parkingRequestsFetched: {
        statusCode: 200,
        status: "success",
        message: "Parking requests fetched successfully."
    },
    reviewFetched:{
        statusCode: 200,
        status:'success',
        message: 'Review fetched successfully.'
    },
    accountLinked:{
        statusCode: 200,
        status:'success',
        message: 'User account linked successfully.'
    },
    customAccountError:{
        statusCode: 103,
        status: "warning",
        message: ''
    },
    SPACE_OWNER_ACCOUNT_NOT_EXITS:{
        statusCode: 400,
        status: "warning",
        type:"space_owner_custom_account",
        message: "Please setup your bank account first."
    },
    SPACE_OWNER_ACCOUNT_IS_NOT_VERIFIED:{
        statusCode: 400,
        status: "warning",
        type:"SPACE_OWNER_ACCOUNT_IS_NOT_VERIFIED",
        message: "Your account is not verifiy"
    },
    YOU_CAN_NOT_WITHDRAWAL_AMOUNT:{
        statusCode: 103,
        status: "warning",
        message: "You can't Withdrawal this amount right now.",
        type:"YOU_CAN_NOT_WITHDRAWAL_AMOUNT"
    },

};
