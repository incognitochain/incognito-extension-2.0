// import React from "react";
// import { Field, InjectedFormProps } from "redux-form";
// import { InputField, validator } from "@components/ReduxForm";
// import styled from "styled-components";
// import withAction, { IMergeProps } from "./Action.enhance";
// import Header from "@components/Header";
// import { Button } from "@components/Core";
//
// const Styled = styled.div`
//   .btn-container {
//     margin-top: 30px;
//   }
// `;
//
// const Action = (props: IMergeProps & InjectedFormProps & any) => {
//   const { handleSubmit, handleAction, disabledForm, isCreate }: IMergeProps & InjectedFormProps = props;
//   return (
//     <Styled>
//       <Header title="" />
//       <form onSubmit={handleSubmit(handleAction)}>
//         <Field
//           component={InputField}
//           name="name"
//           label="Name"
//           validate={[validator.required]}
//           componentProps={{
//             placeholder: "Name",
//             autoFocus: true,
//             maxLength: 50,
//           }}
//         />
//         <Field
//           component={InputField}
//           name="address"
//           label="Address"
//           validate={[validator.required]}
//           componentProps={{
//             placeholder: "Address",
//             readOnly: true,
//           }}
//         />
//         <Button title={isCreate ? "Create" : "Edit"} type="submit" disabled={disabledForm} />
//       </form>
//     </Styled>
//   );
// };
//
// export default withAction(Action);

export default {};
