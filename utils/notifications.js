import React from 'react'
import {  AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const UDACICARDS_NOTIFICATION_KEY = 'udacicards:notifications'

export function clearLocalNotification () {
  return AsyncStorage.removeItem(UDACICARDS_NOTIFICATION_KEY)

    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'Humm you need to study!',
    body: "👋 don't forget practice today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(UDACICARDS_NOTIFICATION_KEY)

    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()
              
              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1 )
              tomorrow.setHours(19)
              tomorrow.setMintutes(30)

              Notifications.scheduleLocalNotificationsAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(UDACICARDS_NOTIFICATION_KEY, JSON.stringify(true))
            
            }
          })
      }
    })
}