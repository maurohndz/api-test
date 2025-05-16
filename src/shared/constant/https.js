export const success = {
    ok: { code: 200, message: 'http.success.ok' },
    created: { code: 201, message: 'http.success.created' }
}

export const errors = {
    // Código 400
    otp: { code: 400, message: 'http.error.otp' },
    login: { code: 400, message: 'http.error.login' },
    exists: { code: 400, message: 'http.error.exists' },
    bad_req: { code: 400, message: 'http.error.bad_req' },
    validation: { code: 400, message: 'http.error.bad_req' },
    store_not_completed: { code: 400, message: 'stores.not_completed' },
    offer_expired: { code: 400, message: 'offers.expired' },
    product_has_offer: { code: 400, message: 'products.has_offer' },
    order_not_permitted: { code: 400, message: 'orders.not_permitted' },
    payment_method_not_found: { code: 400, message: 'payment_methods.not_found' },
    bank_details_not_found: { code: 400, message: 'bank_details.not_found' },
    no_available_offers: { code: 400, message: 'products.no_available' },
    payment_already_made: { code: 400, message: 'orders.payment_already_made' },
    product_has_offer_delete: { code: 400, message: 'product_has_offer_delete' },
    product_not_found: { code: 400, message: 'products.not_found' },
    category_not_found: { code: 400, message: 'categories.not_found' },
    product_emission_not_found: { code: 400, message: 'products_emission.not_found' },
    sector_not_found: { code: 400, message: 'sectors.not_found' },
    not_completed_profile: { code: 400, message: 'users.not_completed_profile' },

    // Código 401
    auth: { code: 401, message: 'http.error.auth' },

    // Código 404
    not_found: { code: 404, message: 'http.error.not_found' },

    // Código 500
    server: { code: 500, message: 'http.error.server' },
}
