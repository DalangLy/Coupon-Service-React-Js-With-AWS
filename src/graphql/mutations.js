/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      phone
      jobTitle
      company
      companyAddress
      note
      groups
      status
      deletedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      phone
      jobTitle
      company
      companyAddress
      note
      groups
      status
      deletedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      phone
      jobTitle
      company
      companyAddress
      note
      groups
      status
      deletedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createCoupon = /* GraphQL */ `
  mutation CreateCoupon(
    $input: CreateCouponInput!
    $condition: ModelCouponConditionInput
  ) {
    createCoupon(input: $input, condition: $condition) {
      id
      name
      price
      period
      shortcut
      description
      deletedAt
      creator {
        id
        firstName
        lastName
        email
        phone
        jobTitle
        company
        companyAddress
        note
        groups
        status
        deletedAt
        createdAt
        updatedAt
        owner
      }
      packages {
        items {
          id
          name
          quantity
          price
          discount
          description
          deletedAt
          createdAt
          updatedAt
          couponPackagesId
          packageCreatorId
        }
        nextToken
      }
      couponDiscountPackage {
        items {
          id
          couponID
          couponDiscountPackageID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      couponCreatorId
    }
  }
`;
export const updateCoupon = /* GraphQL */ `
  mutation UpdateCoupon(
    $input: UpdateCouponInput!
    $condition: ModelCouponConditionInput
  ) {
    updateCoupon(input: $input, condition: $condition) {
      id
      name
      price
      period
      shortcut
      description
      deletedAt
      creator {
        id
        firstName
        lastName
        email
        phone
        jobTitle
        company
        companyAddress
        note
        groups
        status
        deletedAt
        createdAt
        updatedAt
        owner
      }
      packages {
        items {
          id
          name
          quantity
          price
          discount
          description
          deletedAt
          createdAt
          updatedAt
          couponPackagesId
          packageCreatorId
        }
        nextToken
      }
      couponDiscountPackage {
        items {
          id
          couponID
          couponDiscountPackageID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      couponCreatorId
    }
  }
`;
export const deleteCoupon = /* GraphQL */ `
  mutation DeleteCoupon(
    $input: DeleteCouponInput!
    $condition: ModelCouponConditionInput
  ) {
    deleteCoupon(input: $input, condition: $condition) {
      id
      name
      price
      period
      shortcut
      description
      deletedAt
      creator {
        id
        firstName
        lastName
        email
        phone
        jobTitle
        company
        companyAddress
        note
        groups
        status
        deletedAt
        createdAt
        updatedAt
        owner
      }
      packages {
        items {
          id
          name
          quantity
          price
          discount
          description
          deletedAt
          createdAt
          updatedAt
          couponPackagesId
          packageCreatorId
        }
        nextToken
      }
      couponDiscountPackage {
        items {
          id
          couponID
          couponDiscountPackageID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      couponCreatorId
    }
  }
`;
export const createPackage = /* GraphQL */ `
  mutation CreatePackage(
    $input: CreatePackageInput!
    $condition: ModelPackageConditionInput
  ) {
    createPackage(input: $input, condition: $condition) {
      id
      name
      quantity
      price
      discount
      description
      deletedAt
      creator {
        id
        firstName
        lastName
        email
        phone
        jobTitle
        company
        companyAddress
        note
        groups
        status
        deletedAt
        createdAt
        updatedAt
        owner
      }
      coupons {
        id
        name
        price
        period
        shortcut
        description
        deletedAt
        creator {
          id
          firstName
          lastName
          email
          phone
          jobTitle
          company
          companyAddress
          note
          groups
          status
          deletedAt
          createdAt
          updatedAt
          owner
        }
        packages {
          nextToken
        }
        couponDiscountPackage {
          nextToken
        }
        createdAt
        updatedAt
        couponCreatorId
      }
      couponDiscountPackage {
        items {
          id
          discount
          price
          quantity
          description
          deletedAt
          createdAt
          updatedAt
          packageCouponDiscountPackageId
          couponDiscountPackageCouponId
        }
        nextToken
      }
      createdAt
      updatedAt
      couponPackagesId
      packageCreatorId
    }
  }
`;
export const updatePackage = /* GraphQL */ `
  mutation UpdatePackage(
    $input: UpdatePackageInput!
    $condition: ModelPackageConditionInput
  ) {
    updatePackage(input: $input, condition: $condition) {
      id
      name
      quantity
      price
      discount
      description
      deletedAt
      creator {
        id
        firstName
        lastName
        email
        phone
        jobTitle
        company
        companyAddress
        note
        groups
        status
        deletedAt
        createdAt
        updatedAt
        owner
      }
      coupons {
        id
        name
        price
        period
        shortcut
        description
        deletedAt
        creator {
          id
          firstName
          lastName
          email
          phone
          jobTitle
          company
          companyAddress
          note
          groups
          status
          deletedAt
          createdAt
          updatedAt
          owner
        }
        packages {
          nextToken
        }
        couponDiscountPackage {
          nextToken
        }
        createdAt
        updatedAt
        couponCreatorId
      }
      couponDiscountPackage {
        items {
          id
          discount
          price
          quantity
          description
          deletedAt
          createdAt
          updatedAt
          packageCouponDiscountPackageId
          couponDiscountPackageCouponId
        }
        nextToken
      }
      createdAt
      updatedAt
      couponPackagesId
      packageCreatorId
    }
  }
`;
export const deletePackage = /* GraphQL */ `
  mutation DeletePackage(
    $input: DeletePackageInput!
    $condition: ModelPackageConditionInput
  ) {
    deletePackage(input: $input, condition: $condition) {
      id
      name
      quantity
      price
      discount
      description
      deletedAt
      creator {
        id
        firstName
        lastName
        email
        phone
        jobTitle
        company
        companyAddress
        note
        groups
        status
        deletedAt
        createdAt
        updatedAt
        owner
      }
      coupons {
        id
        name
        price
        period
        shortcut
        description
        deletedAt
        creator {
          id
          firstName
          lastName
          email
          phone
          jobTitle
          company
          companyAddress
          note
          groups
          status
          deletedAt
          createdAt
          updatedAt
          owner
        }
        packages {
          nextToken
        }
        couponDiscountPackage {
          nextToken
        }
        createdAt
        updatedAt
        couponCreatorId
      }
      couponDiscountPackage {
        items {
          id
          discount
          price
          quantity
          description
          deletedAt
          createdAt
          updatedAt
          packageCouponDiscountPackageId
          couponDiscountPackageCouponId
        }
        nextToken
      }
      createdAt
      updatedAt
      couponPackagesId
      packageCreatorId
    }
  }
`;
export const createCouponDiscountPackage = /* GraphQL */ `
  mutation CreateCouponDiscountPackage(
    $input: CreateCouponDiscountPackageInput!
    $condition: ModelCouponDiscountPackageConditionInput
  ) {
    createCouponDiscountPackage(input: $input, condition: $condition) {
      id
      discount
      price
      quantity
      description
      package {
        id
        name
        quantity
        price
        discount
        description
        deletedAt
        creator {
          id
          firstName
          lastName
          email
          phone
          jobTitle
          company
          companyAddress
          note
          groups
          status
          deletedAt
          createdAt
          updatedAt
          owner
        }
        coupons {
          id
          name
          price
          period
          shortcut
          description
          deletedAt
          createdAt
          updatedAt
          couponCreatorId
        }
        couponDiscountPackage {
          nextToken
        }
        createdAt
        updatedAt
        couponPackagesId
        packageCreatorId
      }
      deletedAt
      coupon {
        id
        name
        price
        period
        shortcut
        description
        deletedAt
        creator {
          id
          firstName
          lastName
          email
          phone
          jobTitle
          company
          companyAddress
          note
          groups
          status
          deletedAt
          createdAt
          updatedAt
          owner
        }
        packages {
          nextToken
        }
        couponDiscountPackage {
          nextToken
        }
        createdAt
        updatedAt
        couponCreatorId
      }
      coupons {
        items {
          id
          couponID
          couponDiscountPackageID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      packageCouponDiscountPackageId
      couponDiscountPackageCouponId
    }
  }
`;
export const updateCouponDiscountPackage = /* GraphQL */ `
  mutation UpdateCouponDiscountPackage(
    $input: UpdateCouponDiscountPackageInput!
    $condition: ModelCouponDiscountPackageConditionInput
  ) {
    updateCouponDiscountPackage(input: $input, condition: $condition) {
      id
      discount
      price
      quantity
      description
      package {
        id
        name
        quantity
        price
        discount
        description
        deletedAt
        creator {
          id
          firstName
          lastName
          email
          phone
          jobTitle
          company
          companyAddress
          note
          groups
          status
          deletedAt
          createdAt
          updatedAt
          owner
        }
        coupons {
          id
          name
          price
          period
          shortcut
          description
          deletedAt
          createdAt
          updatedAt
          couponCreatorId
        }
        couponDiscountPackage {
          nextToken
        }
        createdAt
        updatedAt
        couponPackagesId
        packageCreatorId
      }
      deletedAt
      coupon {
        id
        name
        price
        period
        shortcut
        description
        deletedAt
        creator {
          id
          firstName
          lastName
          email
          phone
          jobTitle
          company
          companyAddress
          note
          groups
          status
          deletedAt
          createdAt
          updatedAt
          owner
        }
        packages {
          nextToken
        }
        couponDiscountPackage {
          nextToken
        }
        createdAt
        updatedAt
        couponCreatorId
      }
      coupons {
        items {
          id
          couponID
          couponDiscountPackageID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      packageCouponDiscountPackageId
      couponDiscountPackageCouponId
    }
  }
`;
export const deleteCouponDiscountPackage = /* GraphQL */ `
  mutation DeleteCouponDiscountPackage(
    $input: DeleteCouponDiscountPackageInput!
    $condition: ModelCouponDiscountPackageConditionInput
  ) {
    deleteCouponDiscountPackage(input: $input, condition: $condition) {
      id
      discount
      price
      quantity
      description
      package {
        id
        name
        quantity
        price
        discount
        description
        deletedAt
        creator {
          id
          firstName
          lastName
          email
          phone
          jobTitle
          company
          companyAddress
          note
          groups
          status
          deletedAt
          createdAt
          updatedAt
          owner
        }
        coupons {
          id
          name
          price
          period
          shortcut
          description
          deletedAt
          createdAt
          updatedAt
          couponCreatorId
        }
        couponDiscountPackage {
          nextToken
        }
        createdAt
        updatedAt
        couponPackagesId
        packageCreatorId
      }
      deletedAt
      coupon {
        id
        name
        price
        period
        shortcut
        description
        deletedAt
        creator {
          id
          firstName
          lastName
          email
          phone
          jobTitle
          company
          companyAddress
          note
          groups
          status
          deletedAt
          createdAt
          updatedAt
          owner
        }
        packages {
          nextToken
        }
        couponDiscountPackage {
          nextToken
        }
        createdAt
        updatedAt
        couponCreatorId
      }
      coupons {
        items {
          id
          couponID
          couponDiscountPackageID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
      packageCouponDiscountPackageId
      couponDiscountPackageCouponId
    }
  }
`;
export const createSaleCoupon = /* GraphQL */ `
  mutation CreateSaleCoupon(
    $input: CreateSaleCouponInput!
    $condition: ModelSaleCouponConditionInput
  ) {
    createSaleCoupon(input: $input, condition: $condition) {
      id
      transaction
      creator {
        id
        firstName
        lastName
        email
        phone
        jobTitle
        company
        companyAddress
        note
        groups
        status
        deletedAt
        createdAt
        updatedAt
        owner
      }
      approver {
        id
        firstName
        lastName
        email
        phone
        jobTitle
        company
        companyAddress
        note
        groups
        status
        deletedAt
        createdAt
        updatedAt
        owner
      }
      owner {
        id
        firstName
        lastName
        email
        phone
        jobTitle
        company
        companyAddress
        note
        groups
        status
        deletedAt
        createdAt
        updatedAt
        owner
      }
      package {
        id
        name
        quantity
        price
        discount
        description
        deletedAt
        creator {
          id
          firstName
          lastName
          email
          phone
          jobTitle
          company
          companyAddress
          note
          groups
          status
          deletedAt
          createdAt
          updatedAt
          owner
        }
        coupons {
          id
          name
          price
          period
          shortcut
          description
          deletedAt
          createdAt
          updatedAt
          couponCreatorId
        }
        couponDiscountPackage {
          nextToken
        }
        createdAt
        updatedAt
        couponPackagesId
        packageCreatorId
      }
      price
      quantity
      discount
      total
      totalCouponSerialCodeAmount
      totalCouponSerialCodeUsed
      description
      status
      deletedAt
      serialCoupons {
        items {
          id
          code
          price
          dateValidStart
          dateValidEnd
          deletedAt
          createdAt
          updatedAt
          saleCouponSerialCouponsId
          couponSerialCodeCouponId
          couponSerialCodeOwnerId
        }
        nextToken
      }
      createdAt
      updatedAt
      saleCouponCreatorId
      saleCouponApproverId
      saleCouponOwnerId
      saleCouponPackageId
    }
  }
`;
export const updateSaleCoupon = /* GraphQL */ `
  mutation UpdateSaleCoupon(
    $input: UpdateSaleCouponInput!
    $condition: ModelSaleCouponConditionInput
  ) {
    updateSaleCoupon(input: $input, condition: $condition) {
      id
      transaction
      creator {
        id
        firstName
        lastName
        email
        phone
        jobTitle
        company
        companyAddress
        note
        groups
        status
        deletedAt
        createdAt
        updatedAt
        owner
      }
      approver {
        id
        firstName
        lastName
        email
        phone
        jobTitle
        company
        companyAddress
        note
        groups
        status
        deletedAt
        createdAt
        updatedAt
        owner
      }
      owner {
        id
        firstName
        lastName
        email
        phone
        jobTitle
        company
        companyAddress
        note
        groups
        status
        deletedAt
        createdAt
        updatedAt
        owner
      }
      package {
        id
        name
        quantity
        price
        discount
        description
        deletedAt
        creator {
          id
          firstName
          lastName
          email
          phone
          jobTitle
          company
          companyAddress
          note
          groups
          status
          deletedAt
          createdAt
          updatedAt
          owner
        }
        coupons {
          id
          name
          price
          period
          shortcut
          description
          deletedAt
          createdAt
          updatedAt
          couponCreatorId
        }
        couponDiscountPackage {
          nextToken
        }
        createdAt
        updatedAt
        couponPackagesId
        packageCreatorId
      }
      price
      quantity
      discount
      total
      totalCouponSerialCodeAmount
      totalCouponSerialCodeUsed
      description
      status
      deletedAt
      serialCoupons {
        items {
          id
          code
          price
          dateValidStart
          dateValidEnd
          deletedAt
          createdAt
          updatedAt
          saleCouponSerialCouponsId
          couponSerialCodeCouponId
          couponSerialCodeOwnerId
        }
        nextToken
      }
      createdAt
      updatedAt
      saleCouponCreatorId
      saleCouponApproverId
      saleCouponOwnerId
      saleCouponPackageId
    }
  }
`;
export const deleteSaleCoupon = /* GraphQL */ `
  mutation DeleteSaleCoupon(
    $input: DeleteSaleCouponInput!
    $condition: ModelSaleCouponConditionInput
  ) {
    deleteSaleCoupon(input: $input, condition: $condition) {
      id
      transaction
      creator {
        id
        firstName
        lastName
        email
        phone
        jobTitle
        company
        companyAddress
        note
        groups
        status
        deletedAt
        createdAt
        updatedAt
        owner
      }
      approver {
        id
        firstName
        lastName
        email
        phone
        jobTitle
        company
        companyAddress
        note
        groups
        status
        deletedAt
        createdAt
        updatedAt
        owner
      }
      owner {
        id
        firstName
        lastName
        email
        phone
        jobTitle
        company
        companyAddress
        note
        groups
        status
        deletedAt
        createdAt
        updatedAt
        owner
      }
      package {
        id
        name
        quantity
        price
        discount
        description
        deletedAt
        creator {
          id
          firstName
          lastName
          email
          phone
          jobTitle
          company
          companyAddress
          note
          groups
          status
          deletedAt
          createdAt
          updatedAt
          owner
        }
        coupons {
          id
          name
          price
          period
          shortcut
          description
          deletedAt
          createdAt
          updatedAt
          couponCreatorId
        }
        couponDiscountPackage {
          nextToken
        }
        createdAt
        updatedAt
        couponPackagesId
        packageCreatorId
      }
      price
      quantity
      discount
      total
      totalCouponSerialCodeAmount
      totalCouponSerialCodeUsed
      description
      status
      deletedAt
      serialCoupons {
        items {
          id
          code
          price
          dateValidStart
          dateValidEnd
          deletedAt
          createdAt
          updatedAt
          saleCouponSerialCouponsId
          couponSerialCodeCouponId
          couponSerialCodeOwnerId
        }
        nextToken
      }
      createdAt
      updatedAt
      saleCouponCreatorId
      saleCouponApproverId
      saleCouponOwnerId
      saleCouponPackageId
    }
  }
`;
export const createCouponSerialCode = /* GraphQL */ `
  mutation CreateCouponSerialCode(
    $input: CreateCouponSerialCodeInput!
    $condition: ModelCouponSerialCodeConditionInput
  ) {
    createCouponSerialCode(input: $input, condition: $condition) {
      id
      coupon {
        id
        name
        price
        period
        shortcut
        description
        deletedAt
        creator {
          id
          firstName
          lastName
          email
          phone
          jobTitle
          company
          companyAddress
          note
          groups
          status
          deletedAt
          createdAt
          updatedAt
          owner
        }
        packages {
          nextToken
        }
        couponDiscountPackage {
          nextToken
        }
        createdAt
        updatedAt
        couponCreatorId
      }
      owner {
        id
        firstName
        lastName
        email
        phone
        jobTitle
        company
        companyAddress
        note
        groups
        status
        deletedAt
        createdAt
        updatedAt
        owner
      }
      code
      price
      dateValidStart
      dateValidEnd
      deletedAt
      createdAt
      updatedAt
      saleCouponSerialCouponsId
      couponSerialCodeCouponId
      couponSerialCodeOwnerId
    }
  }
`;
export const updateCouponSerialCode = /* GraphQL */ `
  mutation UpdateCouponSerialCode(
    $input: UpdateCouponSerialCodeInput!
    $condition: ModelCouponSerialCodeConditionInput
  ) {
    updateCouponSerialCode(input: $input, condition: $condition) {
      id
      coupon {
        id
        name
        price
        period
        shortcut
        description
        deletedAt
        creator {
          id
          firstName
          lastName
          email
          phone
          jobTitle
          company
          companyAddress
          note
          groups
          status
          deletedAt
          createdAt
          updatedAt
          owner
        }
        packages {
          nextToken
        }
        couponDiscountPackage {
          nextToken
        }
        createdAt
        updatedAt
        couponCreatorId
      }
      owner {
        id
        firstName
        lastName
        email
        phone
        jobTitle
        company
        companyAddress
        note
        groups
        status
        deletedAt
        createdAt
        updatedAt
        owner
      }
      code
      price
      dateValidStart
      dateValidEnd
      deletedAt
      createdAt
      updatedAt
      saleCouponSerialCouponsId
      couponSerialCodeCouponId
      couponSerialCodeOwnerId
    }
  }
`;
export const deleteCouponSerialCode = /* GraphQL */ `
  mutation DeleteCouponSerialCode(
    $input: DeleteCouponSerialCodeInput!
    $condition: ModelCouponSerialCodeConditionInput
  ) {
    deleteCouponSerialCode(input: $input, condition: $condition) {
      id
      coupon {
        id
        name
        price
        period
        shortcut
        description
        deletedAt
        creator {
          id
          firstName
          lastName
          email
          phone
          jobTitle
          company
          companyAddress
          note
          groups
          status
          deletedAt
          createdAt
          updatedAt
          owner
        }
        packages {
          nextToken
        }
        couponDiscountPackage {
          nextToken
        }
        createdAt
        updatedAt
        couponCreatorId
      }
      owner {
        id
        firstName
        lastName
        email
        phone
        jobTitle
        company
        companyAddress
        note
        groups
        status
        deletedAt
        createdAt
        updatedAt
        owner
      }
      code
      price
      dateValidStart
      dateValidEnd
      deletedAt
      createdAt
      updatedAt
      saleCouponSerialCouponsId
      couponSerialCodeCouponId
      couponSerialCodeOwnerId
    }
  }
`;
export const createCouponApplied = /* GraphQL */ `
  mutation CreateCouponApplied(
    $input: CreateCouponAppliedInput!
    $condition: ModelCouponAppliedConditionInput
  ) {
    createCouponApplied(input: $input, condition: $condition) {
      id
      serialCoupon {
        id
        coupon {
          id
          name
          price
          period
          shortcut
          description
          deletedAt
          createdAt
          updatedAt
          couponCreatorId
        }
        owner {
          id
          firstName
          lastName
          email
          phone
          jobTitle
          company
          companyAddress
          note
          groups
          status
          deletedAt
          createdAt
          updatedAt
          owner
        }
        code
        price
        dateValidStart
        dateValidEnd
        deletedAt
        createdAt
        updatedAt
        saleCouponSerialCouponsId
        couponSerialCodeCouponId
        couponSerialCodeOwnerId
      }
      note
      coupon {
        id
        name
        price
        period
        shortcut
        description
        deletedAt
        creator {
          id
          firstName
          lastName
          email
          phone
          jobTitle
          company
          companyAddress
          note
          groups
          status
          deletedAt
          createdAt
          updatedAt
          owner
        }
        packages {
          nextToken
        }
        couponDiscountPackage {
          nextToken
        }
        createdAt
        updatedAt
        couponCreatorId
      }
      issueDate
      applier {
        id
        firstName
        lastName
        email
        phone
        jobTitle
        company
        companyAddress
        note
        groups
        status
        deletedAt
        createdAt
        updatedAt
        owner
      }
      resolver {
        id
        firstName
        lastName
        email
        phone
        jobTitle
        company
        companyAddress
        note
        groups
        status
        deletedAt
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      couponAppliedSerialCouponId
      couponAppliedCouponId
      couponAppliedApplierId
      couponAppliedResolverId
    }
  }
`;
export const updateCouponApplied = /* GraphQL */ `
  mutation UpdateCouponApplied(
    $input: UpdateCouponAppliedInput!
    $condition: ModelCouponAppliedConditionInput
  ) {
    updateCouponApplied(input: $input, condition: $condition) {
      id
      serialCoupon {
        id
        coupon {
          id
          name
          price
          period
          shortcut
          description
          deletedAt
          createdAt
          updatedAt
          couponCreatorId
        }
        owner {
          id
          firstName
          lastName
          email
          phone
          jobTitle
          company
          companyAddress
          note
          groups
          status
          deletedAt
          createdAt
          updatedAt
          owner
        }
        code
        price
        dateValidStart
        dateValidEnd
        deletedAt
        createdAt
        updatedAt
        saleCouponSerialCouponsId
        couponSerialCodeCouponId
        couponSerialCodeOwnerId
      }
      note
      coupon {
        id
        name
        price
        period
        shortcut
        description
        deletedAt
        creator {
          id
          firstName
          lastName
          email
          phone
          jobTitle
          company
          companyAddress
          note
          groups
          status
          deletedAt
          createdAt
          updatedAt
          owner
        }
        packages {
          nextToken
        }
        couponDiscountPackage {
          nextToken
        }
        createdAt
        updatedAt
        couponCreatorId
      }
      issueDate
      applier {
        id
        firstName
        lastName
        email
        phone
        jobTitle
        company
        companyAddress
        note
        groups
        status
        deletedAt
        createdAt
        updatedAt
        owner
      }
      resolver {
        id
        firstName
        lastName
        email
        phone
        jobTitle
        company
        companyAddress
        note
        groups
        status
        deletedAt
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      couponAppliedSerialCouponId
      couponAppliedCouponId
      couponAppliedApplierId
      couponAppliedResolverId
    }
  }
`;
export const deleteCouponApplied = /* GraphQL */ `
  mutation DeleteCouponApplied(
    $input: DeleteCouponAppliedInput!
    $condition: ModelCouponAppliedConditionInput
  ) {
    deleteCouponApplied(input: $input, condition: $condition) {
      id
      serialCoupon {
        id
        coupon {
          id
          name
          price
          period
          shortcut
          description
          deletedAt
          createdAt
          updatedAt
          couponCreatorId
        }
        owner {
          id
          firstName
          lastName
          email
          phone
          jobTitle
          company
          companyAddress
          note
          groups
          status
          deletedAt
          createdAt
          updatedAt
          owner
        }
        code
        price
        dateValidStart
        dateValidEnd
        deletedAt
        createdAt
        updatedAt
        saleCouponSerialCouponsId
        couponSerialCodeCouponId
        couponSerialCodeOwnerId
      }
      note
      coupon {
        id
        name
        price
        period
        shortcut
        description
        deletedAt
        creator {
          id
          firstName
          lastName
          email
          phone
          jobTitle
          company
          companyAddress
          note
          groups
          status
          deletedAt
          createdAt
          updatedAt
          owner
        }
        packages {
          nextToken
        }
        couponDiscountPackage {
          nextToken
        }
        createdAt
        updatedAt
        couponCreatorId
      }
      issueDate
      applier {
        id
        firstName
        lastName
        email
        phone
        jobTitle
        company
        companyAddress
        note
        groups
        status
        deletedAt
        createdAt
        updatedAt
        owner
      }
      resolver {
        id
        firstName
        lastName
        email
        phone
        jobTitle
        company
        companyAddress
        note
        groups
        status
        deletedAt
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      couponAppliedSerialCouponId
      couponAppliedCouponId
      couponAppliedApplierId
      couponAppliedResolverId
    }
  }
`;
export const createSetting = /* GraphQL */ `
  mutation CreateSetting(
    $input: CreateSettingInput!
    $condition: ModelSettingConditionInput
  ) {
    createSetting(input: $input, condition: $condition) {
      id
      name
      body
      createdAt
      updatedAt
    }
  }
`;
export const updateSetting = /* GraphQL */ `
  mutation UpdateSetting(
    $input: UpdateSettingInput!
    $condition: ModelSettingConditionInput
  ) {
    updateSetting(input: $input, condition: $condition) {
      id
      name
      body
      createdAt
      updatedAt
    }
  }
`;
export const deleteSetting = /* GraphQL */ `
  mutation DeleteSetting(
    $input: DeleteSettingInput!
    $condition: ModelSettingConditionInput
  ) {
    deleteSetting(input: $input, condition: $condition) {
      id
      name
      body
      createdAt
      updatedAt
    }
  }
`;
export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
      id
      type
      userId
      title
      body
      status
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
      id
      type
      userId
      title
      body
      status
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
      id
      type
      userId
      title
      body
      status
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createPackageCouponDiscounts = /* GraphQL */ `
  mutation CreatePackageCouponDiscounts(
    $input: CreatePackageCouponDiscountsInput!
    $condition: ModelPackageCouponDiscountsConditionInput
  ) {
    createPackageCouponDiscounts(input: $input, condition: $condition) {
      id
      couponID
      couponDiscountPackageID
      coupon {
        id
        name
        price
        period
        shortcut
        description
        deletedAt
        creator {
          id
          firstName
          lastName
          email
          phone
          jobTitle
          company
          companyAddress
          note
          groups
          status
          deletedAt
          createdAt
          updatedAt
          owner
        }
        packages {
          nextToken
        }
        couponDiscountPackage {
          nextToken
        }
        createdAt
        updatedAt
        couponCreatorId
      }
      couponDiscountPackage {
        id
        discount
        price
        quantity
        description
        package {
          id
          name
          quantity
          price
          discount
          description
          deletedAt
          createdAt
          updatedAt
          couponPackagesId
          packageCreatorId
        }
        deletedAt
        coupon {
          id
          name
          price
          period
          shortcut
          description
          deletedAt
          createdAt
          updatedAt
          couponCreatorId
        }
        coupons {
          nextToken
        }
        createdAt
        updatedAt
        packageCouponDiscountPackageId
        couponDiscountPackageCouponId
      }
      createdAt
      updatedAt
    }
  }
`;
export const updatePackageCouponDiscounts = /* GraphQL */ `
  mutation UpdatePackageCouponDiscounts(
    $input: UpdatePackageCouponDiscountsInput!
    $condition: ModelPackageCouponDiscountsConditionInput
  ) {
    updatePackageCouponDiscounts(input: $input, condition: $condition) {
      id
      couponID
      couponDiscountPackageID
      coupon {
        id
        name
        price
        period
        shortcut
        description
        deletedAt
        creator {
          id
          firstName
          lastName
          email
          phone
          jobTitle
          company
          companyAddress
          note
          groups
          status
          deletedAt
          createdAt
          updatedAt
          owner
        }
        packages {
          nextToken
        }
        couponDiscountPackage {
          nextToken
        }
        createdAt
        updatedAt
        couponCreatorId
      }
      couponDiscountPackage {
        id
        discount
        price
        quantity
        description
        package {
          id
          name
          quantity
          price
          discount
          description
          deletedAt
          createdAt
          updatedAt
          couponPackagesId
          packageCreatorId
        }
        deletedAt
        coupon {
          id
          name
          price
          period
          shortcut
          description
          deletedAt
          createdAt
          updatedAt
          couponCreatorId
        }
        coupons {
          nextToken
        }
        createdAt
        updatedAt
        packageCouponDiscountPackageId
        couponDiscountPackageCouponId
      }
      createdAt
      updatedAt
    }
  }
`;
export const deletePackageCouponDiscounts = /* GraphQL */ `
  mutation DeletePackageCouponDiscounts(
    $input: DeletePackageCouponDiscountsInput!
    $condition: ModelPackageCouponDiscountsConditionInput
  ) {
    deletePackageCouponDiscounts(input: $input, condition: $condition) {
      id
      couponID
      couponDiscountPackageID
      coupon {
        id
        name
        price
        period
        shortcut
        description
        deletedAt
        creator {
          id
          firstName
          lastName
          email
          phone
          jobTitle
          company
          companyAddress
          note
          groups
          status
          deletedAt
          createdAt
          updatedAt
          owner
        }
        packages {
          nextToken
        }
        couponDiscountPackage {
          nextToken
        }
        createdAt
        updatedAt
        couponCreatorId
      }
      couponDiscountPackage {
        id
        discount
        price
        quantity
        description
        package {
          id
          name
          quantity
          price
          discount
          description
          deletedAt
          createdAt
          updatedAt
          couponPackagesId
          packageCreatorId
        }
        deletedAt
        coupon {
          id
          name
          price
          period
          shortcut
          description
          deletedAt
          createdAt
          updatedAt
          couponCreatorId
        }
        coupons {
          nextToken
        }
        createdAt
        updatedAt
        packageCouponDiscountPackageId
        couponDiscountPackageCouponId
      }
      createdAt
      updatedAt
    }
  }
`;
