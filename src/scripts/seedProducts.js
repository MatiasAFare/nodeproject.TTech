import { admin } from '../config/firebase.config.js';

const db = admin.firestore();

const sampleProducts = [
    {
        title: "Laptop HP Pavilion",
        price: 899.99,
        description: "Laptop HP Pavilion 15.6\" con procesador Intel Core i5, 8GB RAM, 256GB SSD",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
    },
    {
        title: "Mouse Logitech MX Master 3",
        price: 99.99,
        description: "Mouse inalámbrico ergonómico con precisión de 4000 DPI",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
    },
    {
        title: "Teclado Mecánico RGB",
        price: 129.99,
        description: "Teclado mecánico gaming con switches Cherry MX Red y retroiluminación RGB",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
    },
    {
        title: "Monitor LG 27\" 4K",
        price: 449.99,
        description: "Monitor LG UltraFine 27\" 4K UHD con tecnología IPS",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
    },
    {
        title: "Auriculares Sony WH-1000XM4",
        price: 349.99,
        description: "Auriculares inalámbricos con cancelación de ruido activa",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }
];

async function seedProducts() {
    try {
        console.log('Starting to seed products...');
        const productsRef = db.collection('products');

        for (const product of sampleProducts) {
            const docRef = await productsRef.add(product);
            console.log(`✅ Product created: ${product.title} (ID: ${docRef.id})`);
        }

        console.log('\n🎉 All products seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding products:', error);
        process.exit(1);
    }
}

seedProducts();
