<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-7 wrapper-auth">
                <div class="content-auth">
                    <p class="zwallet">Zwallet</p>
                    <div class="phone">
                        <img src="../../assets/img/Group 57.png" alt="Phone">
                    </div>
                    <h5>App that Covering Banking Needs.</h5>
                    <p class="small">Zwallet is an application that focussing in banking needs for all users in the world. Always updated and always following world trends. 5000+ users registered in Zwallet everyday with worldwide users coverage.
                    </p>
                </div>
            </div>
            <div class="col-md-5">
                <div class="wrapper-right">
                    <div class="line"></div>
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Auth'
}
</script>

<style >
@font-face {
    font-family: nunito;
    src: url('../../assets/font/NunitoSans-Regular.ttf');
}
body{
    font-family: nunito;
}
/* Wrapper Auth */
.wrapper-auth {
    background-image: url('../../assets/img/Mask Group.png');
    height: 100vh;
    color: white;
}
p.zwallet{
    font-size: 22px;
    font-weight: 600;
    margin: 0;
}
.wrapper-auth > .content-auth {
    padding: 30px 100px;
}
.content-auth>.phone{
    height: 420px;
    display: flex;
    margin: auto;
}
.content-auth>.phone > img {
    object-fit: contain;
    width: 100%;
    height: 100%;
}
p.small {
    margin-top: 20px;
    color: rgba(255, 255, 255, 0.8);
    width: 80%;
    line-height: 24px;
}
/* End Wrapper Auth */

/* Wrapper Right */
.wrapper-right{
    padding: 30px;
    color: black;
}
.wrapper-right h3 {
    color: black !important;
    width: 85%;
}
.wrapper-right p.small {
    color: black
}
.username, .password, .email {
    position: relative;
    margin-top: 50px;
}
.username>img, .password>img, .email>img {
    position: absolute;
    bottom: 12px;
}
.username>input, .password>input, .email>input {
    width: 100%;
    padding: 10px 35px;
    border: none;
    border-bottom: 1.5px solid rgba(169, 169, 169, 0.6);
    background: transparent;
}
.username>input, .password>input,.email>input:focus{
    outline: none;
}
.password > [alt="eye"] {
    right: 0;
}
.forgot-password {
    display: flex;
    justify-content: flex-end;
    font-size: 13px;
    color: black;
    margin-top: 20px;
}
.login-signup {
    display: flex;
    justify-content: center;
    font-size: 15px;
    margin-top: 20px;
}
.line{
    display: none;
}
/* End Wrapper Right */
@media screen and (max-width: 960px){
    .wrapper-auth{
        height: fit-content;
    }
    .wrapper-auth > .content-auth {
        padding: 30px 60px;
    }
}
@media screen and (max-width: 720px) {
    .wrapper-auth {
        height: fit-content;
    }
    .wrapper-auth > .content-auth {
        padding: 20px 25px;
    }
}
@media screen and (max-width: 540px){
    .line{
        display: flex;
        margin: auto;
        background-color: grey;
        border-radius: 20px;
        width: 30%;
        height: 2px;
        margin-top: -10px;
    }
    /* Wrapper Right */
    .wrapper-right{
        background-color: white;
        height: fit-content;
        border-radius: 20px 20px 0 0;
        margin-top: -570px;
    }
    .wrapper-right h3 {
        margin-top:10px;
        width: 100%;
    }
}
@media screen and (max-width: 459px){
    .wrapper-right{
        background-color: white;
        border-radius: 20px 20px 0 0;
        margin-top: -600px;
    }
}
@media screen and (max-width: 395px) {
    .wrapper-right{
        margin-top: -640px;
    }
}
</style>
