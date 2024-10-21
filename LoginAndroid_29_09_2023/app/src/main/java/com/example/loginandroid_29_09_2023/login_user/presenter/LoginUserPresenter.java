package com.example.loginandroid_29_09_2023.login_user.presenter;

import android.util.Log;

import com.example.loginandroid_29_09_2023.beans.User;
import com.example.loginandroid_29_09_2023.login_user.ContractLoginUser;
import com.example.loginandroid_29_09_2023.login_user.model.LoginUserModel;

public class LoginUserPresenter implements ContractLoginUser.Presenter, ContractLoginUser.Model.OnLoginUserListener {

    private ContractLoginUser.View view;
    private ContractLoginUser.Model model;

    public LoginUserPresenter(ContractLoginUser.View view){
        this.view = view;
        model = new LoginUserModel(this);
    }
    @Override
    public void login(User user) {
        model.loginAPI(user, this);
    }

    @Override
    public void onFinished(User user) {
        Log.d("LoginUserPresenter", "Usuario recibido: " + (user != null ? user.getUsername() : "null"));
        if (view != null) {
            view.successLogin(user);
        }
    }


    @Override
    public void onFailure(String err) {

    }
}
