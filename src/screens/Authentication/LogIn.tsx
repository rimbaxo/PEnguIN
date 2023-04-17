import { useMutation, useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
import { useForm, useController } from 'react-hook-form';
import { View } from 'react-native';
import { Button, TextInput, Title } from 'react-native-paper';

import { api } from '@/api';
import { useStateContext } from '@/context';

const LoginScreen = () => {
  const [cookies, setCookie] = useCookies(['logged_in']);

  const { reset, control, handleSubmit } = useForm();
  const stateContext = useStateContext();

  // API Get Current Logged-in user
  const query = useQuery(['authUser'], api.user.getMeFn, {
    enabled: !!cookies.logged_in,
    select: (data) => data,
    onSuccess: (data) => {
      console.log('You successfully logged in');
      stateContext.dispatch({ type: 'SET_USER', payload: data });
      setCookie('logged_in', true, { path: '/', maxAge: 1800 });
    },
    onError: (error) => {
      console.warn(error);
    },
  });

  //  API Login Mutation
  const { mutate: loginUser } = useMutation((userData) => api.auth.loginUserFn(userData), {
    onSuccess: () => {
      query.refetch();
    },
    onError: (error) => {
      console.warn(error);
    },
  });

  const onSubmitHandler = (values) => {
    // ? Executing the loginUser Mutation
    loginUser(values);
    reset();
  };

  const Input = ({ name, control, ...rest }) => {
    const { field } = useController({
      name,
      control,
      rules: { required: true },
      defaultValue: '',
    });

    return (
      <TextInput
        label={name}
        returnKeyType={name === 'password' ? 'done' : 'next'}
        value={field.value}
        onChangeText={field.onChange}
        {...rest}
      />
    );
  };

  return (
    <View>
      <Title>Welcome back.</Title>

      <Input
        name="username"
        autoCapitalize="none"
        textContentType="emailAddress"
        keyboardType="email-address"
        control={control}
      />

      <Input name="password" secureTextEntry control={control} />

      <Button mode="contained" onPress={handleSubmit(onSubmitHandler)}>
        Login
      </Button>
    </View>
  );
};

export default LoginScreen;
