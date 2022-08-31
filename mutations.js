/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
      createdAt
      updatedAt
      packageCouponsId
      owner
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
      createdAt
      updatedAt
      packageCouponsId
      owner
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
      createdAt
      updatedAt
      packageCouponsId
      owner
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
      description
      coupons {
        items {
          id
          name
          price
          period
          shortcut
          description
          createdAt
          updatedAt
          packageCouponsId
          owner
        }
        nextToken
      }
      couponPackage {
        items {
          id
          discount
          price
          quantity
          description
          createdAt
          updatedAt
          packageCouponPackageId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
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
      description
      coupons {
        items {
          id
          name
          price
          period
          shortcut
          description
          createdAt
          updatedAt
          packageCouponsId
          owner
        }
        nextToken
      }
      couponPackage {
        items {
          id
          discount
          price
          quantity
          description
          createdAt
          updatedAt
          packageCouponPackageId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
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
      description
      coupons {
        items {
          id
          name
          price
          period
          shortcut
          description
          createdAt
          updatedAt
          packageCouponsId
          owner
        }
        nextToken
      }
      couponPackage {
        items {
          id
          discount
          price
          quantity
          description
          createdAt
          updatedAt
          packageCouponPackageId
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createCouponPackage = /* GraphQL */ `
  mutation CreateCouponPackage(
    $input: CreateCouponPackageInput!
    $condition: ModelCouponPackageConditionInput
  ) {
    createCouponPackage(input: $input, condition: $condition) {
      id
      discount
      price
      quantity
      description
      package {
        id
        name
        description
        coupons {
          nextToken
        }
        couponPackage {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      packageCouponPackageId
      owner
    }
  }
`;
export const updateCouponPackage = /* GraphQL */ `
  mutation UpdateCouponPackage(
    $input: UpdateCouponPackageInput!
    $condition: ModelCouponPackageConditionInput
  ) {
    updateCouponPackage(input: $input, condition: $condition) {
      id
      discount
      price
      quantity
      description
      package {
        id
        name
        description
        coupons {
          nextToken
        }
        couponPackage {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      packageCouponPackageId
      owner
    }
  }
`;
export const deleteCouponPackage = /* GraphQL */ `
  mutation DeleteCouponPackage(
    $input: DeleteCouponPackageInput!
    $condition: ModelCouponPackageConditionInput
  ) {
    deleteCouponPackage(input: $input, condition: $condition) {
      id
      discount
      price
      quantity
      description
      package {
        id
        name
        description
        coupons {
          nextToken
        }
        couponPackage {
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      packageCouponPackageId
      owner
    }
  }
`;
