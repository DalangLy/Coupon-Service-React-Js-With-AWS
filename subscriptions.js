/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCoupon = /* GraphQL */ `
  subscription OnCreateCoupon($owner: String) {
    onCreateCoupon(owner: $owner) {
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
export const onUpdateCoupon = /* GraphQL */ `
  subscription OnUpdateCoupon($owner: String) {
    onUpdateCoupon(owner: $owner) {
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
export const onDeleteCoupon = /* GraphQL */ `
  subscription OnDeleteCoupon($owner: String) {
    onDeleteCoupon(owner: $owner) {
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
export const onCreatePackage = /* GraphQL */ `
  subscription OnCreatePackage($owner: String) {
    onCreatePackage(owner: $owner) {
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
export const onUpdatePackage = /* GraphQL */ `
  subscription OnUpdatePackage($owner: String) {
    onUpdatePackage(owner: $owner) {
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
export const onDeletePackage = /* GraphQL */ `
  subscription OnDeletePackage($owner: String) {
    onDeletePackage(owner: $owner) {
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
export const onCreateCouponPackage = /* GraphQL */ `
  subscription OnCreateCouponPackage($owner: String) {
    onCreateCouponPackage(owner: $owner) {
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
export const onUpdateCouponPackage = /* GraphQL */ `
  subscription OnUpdateCouponPackage($owner: String) {
    onUpdateCouponPackage(owner: $owner) {
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
export const onDeleteCouponPackage = /* GraphQL */ `
  subscription OnDeleteCouponPackage($owner: String) {
    onDeleteCouponPackage(owner: $owner) {
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
