/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getCoupon = /* GraphQL */ `
  query GetCoupon($id: ID!) {
    getCoupon(id: $id) {
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
export const listCoupons = /* GraphQL */ `
  query ListCoupons(
    $filter: ModelCouponFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCoupons(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getPackage = /* GraphQL */ `
  query GetPackage($id: ID!) {
    getPackage(id: $id) {
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
export const listPackages = /* GraphQL */ `
  query ListPackages(
    $filter: ModelPackageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPackages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getCouponDiscountPackage = /* GraphQL */ `
  query GetCouponDiscountPackage($id: ID!) {
    getCouponDiscountPackage(id: $id) {
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
export const listCouponDiscountPackages = /* GraphQL */ `
  query ListCouponDiscountPackages(
    $filter: ModelCouponDiscountPackageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCouponDiscountPackages(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getSaleCoupon = /* GraphQL */ `
  query GetSaleCoupon($id: ID!) {
    getSaleCoupon(id: $id) {
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
export const listSaleCoupons = /* GraphQL */ `
  query ListSaleCoupons(
    $filter: ModelSaleCouponFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSaleCoupons(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          nextToken
        }
        createdAt
        updatedAt
        saleCouponCreatorId
        saleCouponApproverId
        saleCouponOwnerId
        saleCouponPackageId
      }
      nextToken
    }
  }
`;
export const getCouponSerialCode = /* GraphQL */ `
  query GetCouponSerialCode($id: ID!) {
    getCouponSerialCode(id: $id) {
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
export const listCouponSerialCodes = /* GraphQL */ `
  query ListCouponSerialCodes(
    $filter: ModelCouponSerialCodeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCouponSerialCodes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getCouponApplied = /* GraphQL */ `
  query GetCouponApplied($id: ID!) {
    getCouponApplied(id: $id) {
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
export const listCouponApplieds = /* GraphQL */ `
  query ListCouponApplieds(
    $filter: ModelCouponAppliedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCouponApplieds(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        serialCoupon {
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
        note
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
      nextToken
    }
  }
`;
export const getSetting = /* GraphQL */ `
  query GetSetting($id: ID!) {
    getSetting(id: $id) {
      id
      name
      body
      createdAt
      updatedAt
    }
  }
`;
export const listSettings = /* GraphQL */ `
  query ListSettings(
    $filter: ModelSettingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSettings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        body
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
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
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getPackageCouponDiscounts = /* GraphQL */ `
  query GetPackageCouponDiscounts($id: ID!) {
    getPackageCouponDiscounts(id: $id) {
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
export const listPackageCouponDiscounts = /* GraphQL */ `
  query ListPackageCouponDiscounts(
    $filter: ModelPackageCouponDiscountsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPackageCouponDiscounts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          deletedAt
          createdAt
          updatedAt
          packageCouponDiscountPackageId
          couponDiscountPackageCouponId
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
