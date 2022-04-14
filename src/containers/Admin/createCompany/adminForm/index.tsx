import React, { useState } from 'react'
import { useStore } from 'stores'
import { observer } from 'mobx-react'
import { IFormData } from 'models/index'

import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { resolve } from 'path'
import { number } from 'yup/lib/locale'

import styles from './styles.module.scss'
import classNames from 'classnames'

const schema = yup
  .object({
    name: yup.string().required(),
    address: yup.string().required(),
    city: yup.string().required(),
    monthlyPrice: yup.number().integer().required().positive(),
    phone: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    ownerPhone: yup.string().required(),
    username: yup.string().required().email(),
  })
  .required()

const AdminForm = observer(() => {
  const { CreateCompanyStore } = useStore()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      notes: '',
      name: '',
      address: '',
      city: '',
      monthlyPrice: 0,
      phone: '',
      firstName: '',
      lastName: '',
      ownerPhone: '',
      username: '',
    },
    // resolver: yupResolver(schema),
  })

  const [formData, setFormData] = useState<IFormData>({
    notes: '',
    name: '',
    address: '',
    city: '',
    monthlyPrice: 0,
    phone: '',
    firstName: '',
    lastName: '',
    ownerPhone: '',
    username: '',
  })

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target
    let data: any = value

    if (name === 'monthlyPrice') {
      data = value.replace(/[^0-9]/g, '')
      const zero = data.indexOf(0)

      if (!zero && zero >= 0 && data.length > 1) {
        data = data.substring(1, data.length)
      }
      setFormData((prev: IFormData) => ({ ...prev, [name]: Number(data) }))
    }
    // setFormData((prev: IFormData) => ({ ...prev, [name]: value }))
  }
  console.log(formData)

  const onSubmit = (data: IFormData) => {
    const newformatedData = { ...data, monthlyPrice: Number(data.monthlyPrice) }
    // setFormData({ ...newformatedData })
    CreateCompanyStore.setProfileData(newformatedData)
    CreateCompanyStore.createNewUserAPI(CreateCompanyStore.profileData)
    reset()
  }

  const validateMonthlyPrice = async (value: number | string) => {
    const Timeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
    await Timeout(500)
    if (value > 0) {
      return true
    } else {
      return false
    }
  }
  return (
    <div className={styles.container}>
      <form id="admin-form" onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputsWripper}>
          <div className={styles.inputsContainer}>
            <div className={styles.wripper}>
              <label className={styles.label}>Business Name</label>
              <input
                className={classNames({
                  [styles.input]: true,
                  [styles.errorsInput]: errors.name,
                })}
                type="text"
                placeholder="Business Name"
                // value={formData.name}
                {...register('name', {
                  required: true,
                  minLength: 2,
                })}
                // onChange={onChange}
              />
              {errors?.name?.types?.required && (
                <p className={styles.errorsText}>Business Name required</p>
              )}
            </div>

            <div className={styles.wripper}>
              <label className={styles.label}>Business Address</label>
              <input
                className={classNames({
                  [styles.input]: true,
                  [styles.errorsInput]: errors.address,
                })}
                type="text"
                placeholder="Business Address"
                // value={formData.address}
                {...register('address', {
                  required: true,
                  minLength: 2,
                })}
                // onChange={onChange}
              />
              {errors?.address?.types?.required && (
                <p className={styles.errorsText}>Business Address required</p>
              )}
            </div>

            <div className={styles.wripper}>
              <label className={styles.label}>Business City</label>
              <input
                className={classNames({
                  [styles.input]: true,
                  [styles.errorsInput]: errors.city,
                })}
                type="text"
                // value={formData.city}
                placeholder="Business City"
                {...register('city', {
                  required: true,
                  minLength: 2,
                })}
                // onChange={onChange}
              />
              {errors?.city?.types?.required && (
                <p className={styles.errorsText}>Business City required</p>
              )}
            </div>

            <div className={styles.wripper}>
              <label className={styles.label}>Monthly price</label>
              <input
                className={classNames({
                  [styles.input]: true,
                  [styles.errorsInput]: errors.monthlyPrice,
                })}
                type="text"
                // value={formData.monthlyPrice}
                placeholder="Monthly price"
                {...register('monthlyPrice', {
                  minLength: 1,
                  maxLength: 10,
                  validate: validateMonthlyPrice,
                })}
                onChange={onChange}
              />
              {errors?.monthlyPrice?.types?.required && (
                <p className={styles.errorsText}>Monthly price required</p>
              )}
            </div>

            <div className={styles.wripper}>
              <label className={styles.label}>Phone</label>
              <input
                className={classNames({
                  [styles.input]: true,
                  [styles.errorsInput]: errors.phone,
                })}
                type="text"
                // value={formData.phone}
                placeholder="Phone"
                {...register('phone', {
                  required: true,
                  minLength: 5,
                  maxLength: 13,
                  pattern: /^[\+]?[0-9]{3}?[0-9]{3}?[0-9]{4,6}$/im,
                })}
                // onChange={onChange}
              />
              {errors?.phone?.types?.required && (
                <p className={styles.errorsText}>Phone required</p>
              )}
            </div>
          </div>

          <div className={styles.inputsContainer}>
            <div className={styles.wripper}>
              <label className={styles.label}>First Name</label>
              <input
                className={classNames({
                  [styles.input]: true,
                  [styles.errorsInput]: errors.firstName,
                })}
                type="text"
                // value={formData.firstName}
                placeholder="First Name"
                {...register('firstName', {
                  required: true,
                  minLength: 2,
                })}
                // onChange={onChange}
              />
              {errors?.firstName?.types?.required && (
                <p className={styles.errorsText}>First Name required</p>
              )}
            </div>

            <div className={styles.wripper}>
              <label className={styles.label}>Last Name</label>
              <input
                className={classNames({
                  [styles.input]: true,
                  [styles.errorsInput]: errors.lastName,
                })}
                type="text"
                // value={formData.lastName}
                placeholder="Last Name"
                {...register('lastName', {
                  required: true,
                  minLength: 2,
                })}
                // onChange={onChange}
              />
              {errors?.lastName?.types?.required && (
                <p className={styles.errorsText}>Last Name required</p>
              )}
            </div>

            <div className={styles.wripper}>
              <label className={styles.label}>Business Phone </label>
              <input
                className={classNames({
                  [styles.input]: true,
                  [styles.errorsInput]: errors.ownerPhone,
                })}
                placeholder="Business Phone"
                type="text"
                // value={formData.ownerPhone}
                {...register('ownerPhone', {
                  required: true,
                  minLength: 6,
                  maxLength: 13,
                  pattern: /^[\+]?[0-9]{3}?[0-9]{3}?[0-9]{4,6}$/im,
                })}
                // onChange={onChange}
              />
              {errors?.ownerPhone?.types?.required && (
                <p className={styles.errorsText}>Phone required</p>
              )}
            </div>

            <div className={styles.wripper}>
              <label className={styles.label}>User Name</label>
              <input
                className={classNames({
                  [styles.input]: true,
                  [styles.errorsInput]: errors.username,
                })}
                type="email"
                // value={formData.username}
                placeholder="User Name"
                {...register('username', {
                  required: true,
                  minLength: 5,
                  pattern: /^\S+@\S+$/i,
                })}
                // onChange={onChange}
              />
              {errors?.username?.types?.required && (
                <p className={styles.errorsText}>Email is required</p>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
})

export default AdminForm
