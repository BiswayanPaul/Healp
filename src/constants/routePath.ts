const API_VERSION = 'v1'

export const ROUTES = {
    PAGE: {
        FIND_DOCTOR: `/${API_VERSION}/doctors`,
        BOOK_APPOINTMENT: `/${API_VERSION}/book-appointment`,
        FIND_PACKAGES: `/${API_VERSION}/find-packages`,
        FIND_HOSPITALS: `/${API_VERSION}/find-hospitals`,
        SERVICES: `/${API_VERSION}/services`,
        ABOUT: `/${API_VERSION}/about`,
        CONTACT: `/${API_VERSION}/contacts`,
    },
    API: {
        FIND_DOCTOR: `/api/doctors`,
        FIND_HOSPITALS: `/api/hospitals`,
    },
}
