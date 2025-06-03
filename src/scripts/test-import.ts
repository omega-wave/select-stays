// Test file to verify imports work correctly
console.log('Starting import test');

async function testImport() {
    try {
        const module = await import('./seed-common.js');
        console.log('Import successful');
        console.log('seedDatabase function exists:', typeof module.seedDatabase === 'function');
    } catch (error) {
        console.error('Error importing:', error);
    }
}

testImport().catch(console.error);
