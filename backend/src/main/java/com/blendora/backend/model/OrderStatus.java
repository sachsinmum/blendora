package com.blendora.backend.model;

public enum OrderStatus {
    ORDER_PLACED,
    LEG1_ASSIGNED,
    LEG1_PICKED_UP,
    AT_CHAKKI,
    GRINDING,
    READY_FOR_DELIVERY,
    LEG2_ASSIGNED,
    OUT_FOR_DELIVERY,
    DELIVERED
}
