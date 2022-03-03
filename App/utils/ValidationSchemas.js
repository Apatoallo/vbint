import * as yup from 'yup';
import strings from '../config/strings';

const phoneRegExp = /^5(0[5-7]|[3-5]\d) \d{3} \d{4}$5/;

export const CorporateUserSchema = yup.object().shape({
  registration_type: yup.string().required(strings.FILL_ALL_DATA),
  business_name: yup.string().required(strings.FILL_ALL_DATA),
  author_name: yup.string().required(strings.FILL_ALL_DATA),
  author_identify_number: yup.string().required(strings.FILL_ALL_DATA),
  commercial_title: yup.string().required(strings.FILL_ALL_DATA),
  email: yup.string().email('Hatalı email').required(strings.FILL_ALL_DATA),
  business_mobile: yup.string().required(strings.FILL_ALL_DATA),
  business_phone: yup
    .string()
    .required(strings.FILL_ALL_DATA)
    .max(15, 'Telefonunuz en fazla 15 karakter olmalıdır'),
  city: yup.string().required(strings.FILL_ALL_DATA),
  district: yup.string().required(strings.FILL_ALL_DATA),
  town: yup.string().required(strings.FILL_ALL_DATA),
  tax_administration: yup.string().required(strings.FILL_ALL_DATA),
  tax_number: yup.string().required(strings.FILL_ALL_DATA),
  mersis_number: yup.string().required(strings.FILL_ALL_DATA),
  certificate: yup.object().nullable().required(strings.FILL_ALL_DATA),
  address: yup.string().required(strings.FILL_ALL_DATA),
  category_type_id: yup.string().required(strings.FILL_ALL_DATA),
  information_text: yup
    .bool()
    .required(strings.FILL_ALL_DATA)
    .oneOf([true], 'kabul edilmelidir.'),
});

export const RegularUserSchema = yup.object().shape({
  firstName: yup.string().required(strings.FILL_ALL_DATA),
  lastName: yup.string().required(strings.FILL_ALL_DATA),
  email: yup.string().email('Hatalı email').required(strings.FILL_ALL_DATA),
  phone: yup
    .string()
    .required(strings.FILL_ALL_DATA)
    .max(15, 'Telefonunuz en fazla 15 karakter olmalıdır'),
  password: yup
    .string()
    .required(strings.FILL_ALL_DATA)
    .min(6, 'Şifreniz en az 6 karakter olmalıdır'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Şifre tekrarı eşleşmiyor.')
    .required(strings.FILL_ALL_DATA),
  information_text: yup
    .bool()
    .required(strings.FILL_ALL_DATA)
    .oneOf([true], 'kabul edilmelidir.'),
});

export const LoginSchema = yup.object().shape({
  email: yup.string().email('hatalı email').required(strings.FILL_ALL_DATA),
  password: yup
    .string()
    .required(strings.FILL_ALL_DATA)
    .min(6, 'Şifreniz en az 6 karakter olmalıdı'),
});

export const resetPasswordSchema = yup.object().shape({
  email: yup.string().email('hatalı email').required(strings.FILL_ALL_DATA),
});

export const ReservationSchema = yup.object().shape({
  fullName: yup.string().required(strings.FILL_ALL_DATA),
  description: yup.string(),
  email: yup.string().email('Hatalı email').required(strings.FILL_ALL_DATA),
  phone: yup
    .string()
    .required(strings.FILL_ALL_DATA)
    .max(15, 'Telefonunuz en fazla 15 karakter olmalıdır'),
});

export const ChangePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required(strings.FILL_ALL_DATA)
    .min(6, 'Şifreniz en az 6 karakter olmalıdır'),
  newPassword: yup
    .string()
    .required(strings.FILL_ALL_DATA)
    .min(6, 'Şifreniz en az 6 karakter olmalıdır'),
  rePassword: yup
    .string()
    .required(strings.FILL_ALL_DATA)
    .oneOf([yup.ref('newPassword'), null], 'Şifre tekrarı eşleşmiyor.')
    .min(6, 'Şifreniz en az 6 karakter olmalıdır'),
});

export const AppleUserSchema = yup.object().shape({
  firstName: yup.string().required(strings.FILL_ALL_DATA),
  lastName: yup.string().required(strings.FILL_ALL_DATA),
});
