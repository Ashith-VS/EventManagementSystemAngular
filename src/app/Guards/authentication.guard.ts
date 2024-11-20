import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../redux/selectors/authentication.selector';

export const authenticationGuard: CanActivateFn = (route, state) => {
  // console.log('route: ', route?.routeConfig?.path);

  const platFormId = inject(PLATFORM_ID)
  const router= inject(Router)
  const store = inject(Store)

  let currentUserRole :string | null = null;

  store.select(selectCurrentUser).subscribe((res)=>{
    currentUserRole=res?.role|| null;
  })

  // Define private routes for admins only
  const privateRoutes = ['dashboard','dashboard/all-event','dashboard/:id']

  // Check if the platform is the browser
  if(isPlatformBrowser(platFormId)){
    const currentUser = localStorage.getItem('currentUser')
   
    if(currentUser !== null ){
       // Check if the current route is a private route and requires admin access
      if (privateRoutes.includes(route?.routeConfig?.path || '')) {
        if (currentUserRole === 'admin') {
          return true;
        }else{
          router.navigateByUrl('home') // Redirect to home if not admin
          return false;
        }
      }
      return true;// Allow access for public routes
    }else{
      router.navigateByUrl('login')
      return false;
    }
    }
    else{
      return false;
    }

  

};
