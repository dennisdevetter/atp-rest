var cacheHelper = require('../index')

describe('utils', () => {  	
	describe('cache helper', () => {
		var cacheInstance = { 
			'item1': 'abc',
			'item2': 'def',
		} 
		var cache = cacheHelper.createCache(cacheInstance)

		beforeEach(() => {
			
		})

		it('should add an item to the cache', () => {
			cache.add('key1', 'abcdef')
			expect(cacheInstance['key1']).to.equal('abcdef')
		})

		it('should get an item from the cache', () => {
			var result = cache.get('item1')
			expect(result).to.not.be.empty
			expect(result).to.equal('abc')
		})

		it('should overwrite an existing item in the cache', () => {
			cache.add('item1', 'abcdef')
			var result = cache.get('item1')
			expect(result).to.equal('abcdef')
		})

		it('should remove an item from the cache', () => {
			cache.remove('item2')
			expect(cache.get('item2')).to.be.empty
		})

		afterEach(() => {

		})
	})
})