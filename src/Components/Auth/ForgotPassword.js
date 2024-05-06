import React, { useState } from "react";
import { forgetPassword } from "../../Api/auth";
import { useNotification } from "../../Hooks/index";
import { isValidEmail } from "../../Utils/helper";
import { commonModalClasses } from "../../Utils/theme";
import Container from "../../CommonComponents/Container";
import CustomLink from "../../CommonComponents/CustomLink";
import FormContainer from "../Form/FormContainer";
import FormInput from "../Form/FormInput";
import Submit from "../Form/Submit";
import Title from "../Form/Title";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const { updateNotification } = useNotification();

  const handleChange = ({ target }) => {
    const { value } = target;
    setEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email))
      return updateNotification("error", "Invalid email!");

    const { error, message } = await forgetPassword(email);
    if (error) return updateNotification("error", error);

    updateNotification("error", message);
    const Link = localStorage.getItem("Link");
    if (Link) {
      const ClickbleLink = JSON.parse(Link);
      const Data = ClickbleLink.link
    window.location.href=Data
    }
  };

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-96"}>
          <Title>Please Enter Your Email</Title>
          <FormInput
            onChange={handleChange}
            value={email}
            label="Email"
            placeholder="john@email.com"
            name="email"
          />
          <Submit value="Send Link" />

          <div className="flex justify-between">
            <CustomLink to="/auth/signin">Sign in</CustomLink>
            <CustomLink to="/auth/signup">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
