self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon || '/home-fin-dark.png',
      badge: '/badge.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '2',
      },
    };
    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

self.addEventListener('notificationclick', function (event) {
  console.log('Notification click received.');
  event.notification.close();
  event.waitUntil(
    clients.openWindow(
      process.env.NEXT_PUBLIC_APP_URL || 'https://localhost:3000'
    )
  );
});

// self.addEventListener('push', function (event) {
//   const title = 'New Notification';
//   const options = {
//     body: event.data ? event.data.text() : 'You have a new notification!',
//   };

//   event.waitUntil(self.registration.showNotification(title, options));
// });
