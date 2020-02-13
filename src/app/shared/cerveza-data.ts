import { InMemoryDbService } from 'angular-in-memory-web-api';

export class CervezaData implements InMemoryDbService {

  createDb() {
    let cervezas = [
      {
        "id": 0,
        "name": "Alhambra",
        "price": 24.99,
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "image": "https://www.comprar-bebidas.com/media/catalog/product/cache/5/image/767x1021/9df78eab33525d08d6e5fb8d27136e95/2/3/x2372.jpg.pagespeed.ic.tEcuB-KLRf.jpg"
      },
      {
        "id": 1,
        "name": "Estrella Galicia",
        "price": 64.99,
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "image": "https://lh3.googleusercontent.com/proxy/ivYUBAVdtX9V8tg472qMC7xEL7toJ8xJBXXB8WuH2ZAUcF7Oh8uXXF31OJHkOgpyse97HN-8VclH28LDHq5MQJ7ISf17ya6TSlEJIwwPui_11pzpo_4yaM2oqjN0g40ZdA1uYPk5KCLFSSHXdmTb"
      },
      {
        "id": 2,
        "name": "Ambar",
        "price": 74.99,
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "image": "https://ambar.com/wp-content/uploads/2018/09/800X8001.jpg"
      }
    ];
    return { cervezas: cervezas };
  }
}
