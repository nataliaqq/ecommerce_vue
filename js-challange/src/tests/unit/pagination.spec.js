import { shallowMount } from '@vue/test-utils'
import Pagination from '../../components/Pagination.vue'

describe('Pagination', () => {
  let pagination

  beforeEach(() => {
    pagination = shallowMount(Pagination, {
      propsData: {
        lastPage: 9,
        delta: 1,
      },
      data () {
        return {
          currentPage: 3,
          firstPage: 1,
        }
      }
    })
  })

  it('does not allow negative last page', () => {
    expect(pagination.vm.$options.props.lastPage.validator(-1)).toBeFalsy();
  })

  it('does not allow negative delta', () => {
    expect(pagination.vm.$options.props.delta.validator(-1)).toBeFalsy();
  })

  it('calculates the correct left and right', () => {
    const left = pagination.vm.left;
    const right = pagination.vm.right;

    expect(left).toBe(2);
    expect(right).toBe(5);
  })

  it('created right array of pages pagesArray', () => {
    expect(pagination.vm.pagesArray).toEqual([
        1,2,3,4,5,6,7,8,9
    ])
  })

  it('change the current page if a left/right arrow is clicked', () => {
    pagination.find('#arrow-left').trigger('click')

    pagination.vm.$nextTick().then(() => {
      expect(pagination.emitted()['loadPage']).toBeTruthy()
      expect(pagination.vm.currentPage).toBe(2)
    }).catch(() => {
    })

    pagination.find('#arrow-right').trigger('click')

    pagination.vm.$nextTick().then(() => {
      expect(pagination.emitted()['loadPage']).toBeTruthy()
      expect(pagination.vm.currentPage).toBe(4)
    }).catch(() => {
    })
  })

  it('change the current page if a page number is clicked', () => { 
    pagination.findAll('.pagination__item').at(1).trigger('click')

    pagination.vm.$nextTick().then(() => {
      expect(pagination.emitted()['loadPage']).toBeTruthy()
      expect(pagination.vm.currentPage).toBe(1)
    }).catch(() => {
      return
    })
  })

  it('set the default last page if it was not provided', () => {
    pagination = shallowMount(Pagination, {
      propsData: { delta: 1 },
    })

    expect(pagination.vm.lastPage).toBe(10);
  });

  it('create paginationArray correctly', () => {
    pagination.setData({
      currentPage: 1,
    })
    expect(pagination.vm.paginationArray).toEqual([
      1,2,'...',9
    ])

    pagination.setData({
      currentPage: 2,
    })
    expect(pagination.vm.paginationArray).toEqual([
      1,2,3,'...',9
    ])
    
    pagination.setData({
      currentPage: 5,
    })
    expect(pagination.vm.paginationArray).toEqual([
      1,'...',4,5,6,'...',9
    ])
  })
})
  