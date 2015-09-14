function DemoData() {

    _.extend(DemoData.prototype, {


        init: function() {
        	
        },
        users: function() {
        	var users = [
	        	{
	        		'id': "0",
	        		'name': "Drew Vosburg",
	        		'email': "drew@vosburgs.org",
	        		//obvi not going to do plaintext passwords.
	        		'password': "password123",
	        		'lists': [
	        			'list0',
	        			'list1',
	        			'list2'
	        		]
	        	}
	        ];
        	return users;
        },
        claimed: function() {
            var claimed = [
                {
                    'item': 'item1',
                    'listId': 'list0',
                    'claimerId': "0",
                    'gotten': false
                },
                {
                    'item': 'item10',
                    'listId': 'list2',
                    'claimerId': "0",
                    'gotten': true
                }
            ];
            return claimed;
        },
        lists: function() {
        	var lists = [
        		{
        			'id': "list0",
                    'owner': '0',
        			'created': "auto",
        			'type': "christmas",
        			'title': "Christmas List",
                    // not sure how I should store timestamps, UNIX feels shortsighted...
        			'date': "2015-12-24T23:00:00-06:00",
        			'items': [
        				'item0',
        				'item1',
        				'item2',
        				'item3'
    				],
    				'sharedWith': [
    					'0'
    				]
        		},
        		{
        			'id': "list1",
                    'owner': '0',
        			'created': "auto",
        			'type': "birthday",
        			'title': "Birthday List",
        			'date': "2016-01-16T23:00:00-06:00",
        			'items': [
        				'item4',
        				'item5',
        				'item6',
        				'item7'
    				],
    				'sharedWith': [
    					'0'
    				]
        		},
        		{
        			'id': "list2",
                    'owner': '0',
        			'created': "auto",
        			'type': "wishlist",
        			'title': "Wish List",
        			'date': "none",
        			'items': [
        				'item8',
        				'item9',
        				'item10',
        				'item11'
			        ],
    				'sharedWith': [
    					'0'
    				]
			    }
        	];
        	return lists;
        },
        items: function() {
        	var items = [
    			{
    				'id': 'item0',
	                'title': "KeySmart - Compact Key Holder (Black)",
	                'price': 20,
	                'image': "http://ecx.images-amazon.com/images/I/51OGiB1j3KL._SY679_.jpg",
	                'url': "http://www.amazon.com/KeySmart-Compact-Key-Holder-Black/dp/B00JOFJJ5Y/ref=pd_sim_229_2?ie=UTF8&refRID=0GVFH7Y5EHXCHC7VB1YY&dpSrc=sims&dpST=_AC_UL160_SR160%2C160_",
	                'claimed': false
	            },
    			{
    				'id': 'item1',
	                'title': "Second Product",
	                'price': 20,
	                'image': "http://ecx.images-amazon.com/images/I/51OGiB1j3KL._SY679_.jpg",
	                'url': "http://www.amazon.com/KeySmart-Compact-Key-Holder-Black/dp/B00JOFJJ5Y/ref=pd_sim_229_2?ie=UTF8&refRID=0GVFH7Y5EHXCHC7VB1YY&dpSrc=sims&dpST=_AC_UL160_SR160%2C160_",
	            	'claimed': true
	            },
    			{
    				'id': 'item2',
	                'title': "Other Product",
	                'price': 20,
	                'image': "http://ecx.images-amazon.com/images/I/51OGiB1j3KL._SY679_.jpg",
	                'url': "http://www.amazon.com/KeySmart-Compact-Key-Holder-Black/dp/B00JOFJJ5Y/ref=pd_sim_229_2?ie=UTF8&refRID=0GVFH7Y5EHXCHC7VB1YY&dpSrc=sims&dpST=_AC_UL160_SR160%2C160_",
	            	'claimed': false
	            },
    			{
    				'id': 'item3',
	                'title': "Frank - Compact Key Holder (Black)",
	                'price': 20,
	                'image': "http://ecx.images-amazon.com/images/I/51OGiB1j3KL._SY679_.jpg",
	                'url': "http://www.amazon.com/KeySmart-Compact-Key-Holder-Black/dp/B00JOFJJ5Y/ref=pd_sim_229_2?ie=UTF8&refRID=0GVFH7Y5EHXCHC7VB1YY&dpSrc=sims&dpST=_AC_UL160_SR160%2C160_",
                    'claimed': false
	            },
    			{
    				'id': 'item4',
	                'title': "Google - Compact Key Holder (Black)",
	                'price': 20,
	                'image': "http://ecx.images-amazon.com/images/I/51OGiB1j3KL._SY679_.jpg",
	                'url': "http://www.amazon.com/KeySmart-Compact-Key-Holder-Black/dp/B00JOFJJ5Y/ref=pd_sim_229_2?ie=UTF8&refRID=0GVFH7Y5EHXCHC7VB1YY&dpSrc=sims&dpST=_AC_UL160_SR160%2C160_",
	                'claimed': false
	            },
    			{
    				'id': 'item5',
	                'title': "Second Product",
	                'price': 20,
	                'image': "http://ecx.images-amazon.com/images/I/51OGiB1j3KL._SY679_.jpg",
	                'url': "http://www.amazon.com/KeySmart-Compact-Key-Holder-Black/dp/B00JOFJJ5Y/ref=pd_sim_229_2?ie=UTF8&refRID=0GVFH7Y5EHXCHC7VB1YY&dpSrc=sims&dpST=_AC_UL160_SR160%2C160_",
	                'claimed': false
	            },
    			{
    				'id': 'item6',
	                'title': "Third Product",
	                'price': 20,
	                'image': "http://ecx.images-amazon.com/images/I/51OGiB1j3KL._SY679_.jpg",
	                'url': "http://www.amazon.com/KeySmart-Compact-Key-Holder-Black/dp/B00JOFJJ5Y/ref=pd_sim_229_2?ie=UTF8&refRID=0GVFH7Y5EHXCHC7VB1YY&dpSrc=sims&dpST=_AC_UL160_SR160%2C160_",
	                'claimed': false
	            },
    			{
    				'id': 'item7',
	                'title': "Frank - Compact Key Holder (Black)",
	                'price': 20,
	                'image': "http://ecx.images-amazon.com/images/I/51OGiB1j3KL._SY679_.jpg",
	                'url': "http://www.amazon.com/KeySmart-Compact-Key-Holder-Black/dp/B00JOFJJ5Y/ref=pd_sim_229_2?ie=UTF8&refRID=0GVFH7Y5EHXCHC7VB1YY&dpSrc=sims&dpST=_AC_UL160_SR160%2C160_",
	                'claimed': false
	            },
	            {
    				'id': 'item8',
	                'title': "KeySmart - Compact Key Holder (Black)",
	                'price': 20,
	                'image': "http://ecx.images-amazon.com/images/I/51OGiB1j3KL._SY679_.jpg",
	                'url': "http://www.amazon.com/KeySmart-Compact-Key-Holder-Black/dp/B00JOFJJ5Y/ref=pd_sim_229_2?ie=UTF8&refRID=0GVFH7Y5EHXCHC7VB1YY&dpSrc=sims&dpST=_AC_UL160_SR160%2C160_",
	                'claimed': false
	            },
    			{
    				'id': 'item9',
	                'title': "Second Product",
	                'price': 20,
	                'image': "http://ecx.images-amazon.com/images/I/51OGiB1j3KL._SY679_.jpg",
	                'url': "http://www.amazon.com/KeySmart-Compact-Key-Holder-Black/dp/B00JOFJJ5Y/ref=pd_sim_229_2?ie=UTF8&refRID=0GVFH7Y5EHXCHC7VB1YY&dpSrc=sims&dpST=_AC_UL160_SR160%2C160_",
	                'claimed': false
	            },
    			{
    				'id': 'item10',
	                'title': "millionth Product",
	                'price': 20,
	                'image': "http://ecx.images-amazon.com/images/I/51OGiB1j3KL._SY679_.jpg",
	                'url': "http://www.amazon.com/KeySmart-Compact-Key-Holder-Black/dp/B00JOFJJ5Y/ref=pd_sim_229_2?ie=UTF8&refRID=0GVFH7Y5EHXCHC7VB1YY&dpSrc=sims&dpST=_AC_UL160_SR160%2C160_",
	                'claimed': true
	            },
    			{
    				'id': 'item11',
	                'title': "Frank - Compact Key Holder (Black)",
	                'price': 20,
	                'image': "http://ecx.images-amazon.com/images/I/51OGiB1j3KL._SY679_.jpg",
	                'url': "http://www.amazon.com/KeySmart-Compact-Key-Holder-Black/dp/B00JOFJJ5Y/ref=pd_sim_229_2?ie=UTF8&refRID=0GVFH7Y5EHXCHC7VB1YY&dpSrc=sims&dpST=_AC_UL160_SR160%2C160_",
	                'claimed': false
	            }
        	];
        	return items;
        }

    });
}
var demoData = new DemoData();

export default demoData;
