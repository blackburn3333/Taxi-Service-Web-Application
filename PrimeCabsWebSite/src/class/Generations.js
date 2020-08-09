/**
 * Created by Jayendra Matarage on 6/2/2019.
 */

export function generateOTP() {
    const otpStrin = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let otpGen = "";
    for (let i = 0; i < 6; i++) {
        otpGen += otpStrin[Math.floor(Math.random() * otpStrin.length)];
    }
    return otpGen;
}