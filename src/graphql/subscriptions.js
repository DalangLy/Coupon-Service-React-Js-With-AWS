/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String) {
    onCreateUser(owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String) {
    onUpdateUser(owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String) {
    onDeleteUser(owner: $owner) {
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
export const onCreateCoupon = /* GraphQL */ `
  subscription OnCreateCoupon {
    onCreateCoupon {
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
export const onUpdateCoupon = /* GraphQL */ `
  subscription OnUpdateCoupon {
    onUpdateCoupon {
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
export const onDeleteCoupon = /* GraphQL */ `
  subscription OnDeleteCoupon {
    onDeleteCoupon {
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
export const onCreatePackage = /* GraphQL */ `
  subscription OnCreatePackage {
    onCreatePackage {
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
export const onUpdatePackage = /* GraphQL */ `
  subscription OnUpdatePackage {
    onUpdatePackage {
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
export const onDeletePackage = /* GraphQL */ `
  subscription OnDeletePackage {
    onDeletePackage {
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
export const onCreateCouponDiscountPackage = /* GraphQL */ `
  subscription OnCreateCouponDiscountPackage {
    onCreateCouponDiscountPackage {
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
export const onUpdateCouponDiscountPackage = /* GraphQL */ `
  subscription OnUpdateCouponDiscountPackage {
    onUpdateCouponDiscountPackage {
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
export const onDeleteCouponDiscountPackage = /* GraphQL */ `
  subscription OnDeleteCouponDiscountPackage {
    onDeleteCouponDiscountPackage {
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
export const onCreateSaleCoupon = /* GraphQL */ `
  subscription OnCreateSaleCoupon {
    onCreateSaleCoupon {
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
export const onUpdateSaleCoupon = /* GraphQL */ `
  subscription OnUpdateSaleCoupon {
    onUpdateSaleCoupon {
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
export const onDeleteSaleCoupon = /* GraphQL */ `
  subscription OnDeleteSaleCoupon {
    onDeleteSaleCoupon {
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
export const onCreateCouponSerialCode = /* GraphQL */ `
  subscription OnCreateCouponSerialCode {
    onCreateCouponSerialCode {
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
export const onUpdateCouponSerialCode = /* GraphQL */ `
  subscription OnUpdateCouponSerialCode {
    onUpdateCouponSerialCode {
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
export const onDeleteCouponSerialCode = /* GraphQL */ `
  subscription OnDeleteCouponSerialCode {
    onDeleteCouponSerialCode {
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
export const onCreateCouponApplied = /* GraphQL */ `
  subscription OnCreateCouponApplied {
    onCreateCouponApplied {
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
export const onUpdateCouponApplied = /* GraphQL */ `
  subscription OnUpdateCouponApplied {
    onUpdateCouponApplied {
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
export const onDeleteCouponApplied = /* GraphQL */ `
  subscription OnDeleteCouponApplied {
    onDeleteCouponApplied {
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
export const onCreateSetting = /* GraphQL */ `
  subscription OnCreateSetting {
    onCreateSetting {
      id
      name
      body
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSetting = /* GraphQL */ `
  subscription OnUpdateSetting {
    onUpdateSetting {
      id
      name
      body
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSetting = /* GraphQL */ `
  subscription OnDeleteSetting {
    onDeleteSetting {
      id
      name
      body
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePackageCouponDiscounts = /* GraphQL */ `
  subscription OnCreatePackageCouponDiscounts {
    onCreatePackageCouponDiscounts {
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
export const onUpdatePackageCouponDiscounts = /* GraphQL */ `
  subscription OnUpdatePackageCouponDiscounts {
    onUpdatePackageCouponDiscounts {
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
export const onDeletePackageCouponDiscounts = /* GraphQL */ `
  subscription OnDeletePackageCouponDiscounts {
    onDeletePackageCouponDiscounts {
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
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification {
    onCreateNotification {
      id
      type
      userId
      title
      body
      status
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification {
    onUpdateNotification {
      id
      type
      userId
      title
      body
      status
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification {
    onDeleteNotification {
      id
      type
      userId
      title
      body
      status
      createdAt
      updatedAt
    }
  }
`;
