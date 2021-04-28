

'''
all python computation functions
starts here
'''

import numpy as np
import scipy.integrate as integrate
import matplotlib.pyplot as plt

#this is for the back end of our cosmology calculator
#or H_0 must also be a user input...

c=299792658
yr=3.154*10**7
G=6.67*10**(-11)
Mpc=3.086*10**22

#matter radiation curvature dark-energy
def H(z,om_m,om_r,om_k,om_v,H_0):
    return (H_0*np.sqrt(om_m*(1+z)**3+om_r*(1+z)**4+om_k*(1+z)**2+om_v))

def age_func(z,om_m,om_r,om_k,om_v,H_0):
    return 1/(H_0*(1+z)*np.sqrt(om_m*(1+z)**3+om_r*(1+z)**4+om_k*(1+z)**2+om_v))


def com_dist(zgal,om_m,om_r,om_k,om_v,H_0):
    I=integrate.quad(H, 0, zgal, (om_m,om_r,om_k,om_v,H_0))[0]
    return(c*I/Mpc)

def lum_dist(I,zgal):
    return((1+zgal)*I)

def ang_dist(I,zgal):
    return(I/(1+zgal))

def age_universe(zgal,om_m,om_r,om_k,om_v,H_0):
    t0=integrate.quad(age_func, 0, np.inf, (om_m,om_r,om_k,om_v,H_0))[0]
    I=integrate.quad(age_func, 0, zgal, (om_m,om_r,om_k,om_v,H_0))[0]
    print(t0,I)
    return((t0-I)/yr,I/yr)

def cmb_temp(zgal, T0):
    return T0*(1+zgal)

#ye hain show vala function ... isme saari values return hoti hain

def show(zgal,om_m,om_r,om_k,om_v,T_0=2.7,H_0=69.7*10**3/(10**6*3.086*10**16)):
    n=1000
    comoving_dist=com_dist(zgal,om_m,om_r,om_k,om_v,H_0)
    age,lookback=age_universe(zgal,om_m,om_r,om_k,om_v,H_0)
    angular_dia=ang_dist(comoving_dist,zgal)
    luminosity_dist=lum_dist(comoving_dist,zgal)
    Hval=H(zgal,om_m,om_r,om_k,om_v,H_0)*10**3/Mpc
    cmb=cmb_temp(zgal,T_0)
    return(age,lookback,angular_dia,luminosity_dist,comoving_dist,Hval,cmb)

#aur koi plot ideas ho to batana...
#color palette khud daal liyo apne front end ke hisab se...

zgal = 0 
H_0 = 69.7 
om_m = 0.27 
om_r = 0.0
om_v = 0.73
om_k = 1-om_m -  om_v - om_r 

return_val = show(zgal , om_m , om_r , om_k , om_v)
print(return_val)


def possible_plots(om_m,om_r,om_k,om_v,H_0=69.7*10**3/(10**6*3.086*10**16)):
    #evolution of different distances with redshift
    #wrt time bhi kar sakte hain maybe
    zarr=np.logspace(-2,5,50)
    com=np.array([com_dist(z,om_m,om_r,om_k,om_v,H_0) for z in zarr])
    ang_dia=np.array([ang_dist(com[i],zarr[i]) for i in range(0,len(zarr))])
    lum=np.array([lum_dist(com[i],zarr[i]) for i in range(0,len(zarr))])

    plt.style.use('dark_background')
    plt.rcParams['font.family']='serif'

    fig1,ax1=plt.subplots(1,1,figsize=(7,7))
    ax1.set_xscale('log')
    ax1.set_yscale('log')
    ax1.set_title('Evolution of cosmic distances')
    ax1.set_xlabel('redshift')
    ax1.set_ylabel('Distance(Mpc)')
    ax1.invert_xaxis()
    ax1.xaxis.grid(True, which='major',linestyle=':',color="#696969")
    ax1.yaxis.grid(True, which='major',linestyle=':',color="#696969")

    ax1.plot(zarr, lum, label='luminosity distance')
    ax1.plot(zarr, ang_dia, label='angular diameter distance')
    ax1.plot(zarr, com, label='comoving distance')
    ax1.legend()

    #evolution of density with redshift
    rho_c=3*H_0**2/(8*np.pi*G)
    rho_m_arr=[om_m*rho_c*(1+z)**3 for z in zarr]
    rho_r_arr=[om_r*rho_c*(1+z)**4 for z in zarr]
    rho_v_arr=[om_v*rho_c for z in zarr]

    fig2,ax2=plt.subplots(1,1,figsize=(7,7))
    ax2.set_title('Evolution of Density')
    ax2.set_xlabel('redshift')
    ax2.set_ylabel('density($kg/m^3$)')
    ax2.set_xscale('log')
    ax2.set_yscale('log')
    ax2.invert_xaxis()
    ax2.xaxis.grid(True, which='major',linestyle=':',color="#696969")
    ax2.yaxis.grid(True, which='major',linestyle=':',color="#696969")

    ax2.plot(zarr, rho_m_arr, label='matter')
    ax2.plot(zarr, rho_r_arr, label='radiation')
    ax2.plot(zarr, rho_v_arr, label='dark energy')
    ax2.legend()

    #plt.show()
    return fig1 , fig2

#try kar rhe the to solve the friedmann equation but ni hua ... lol.
#kuch to gadbad ki hain... hence commented.
'''
def fluid(t,rho,a,k):
    return (-3*freidmann(t,a,rho,k)*(rho)/a)


def freidmann(t,a,rho,k):
    #print('...',rho_m0,rho_r0)
    #print('...',(8*np.pi*G/3)*(rho))
    return np.sqrt(np.abs((8*np.pi*G/3)*rho*a**2))

def runge_kutta(f,xo,yo,theother,k,h):
    fo=f(xo,yo,theother,k)
    f1=f(xo+h/2,yo+(h/2)*fo,theother,k)
    f2=f(xo+h/2,yo+(h/2)*f1,theother,k)
    f3=f(xo+h,yo+h*f2,theother,k)
    return(yo+(h/6)*(fo+2*f1+2*f2+f3))

def scale_fac_evol(om_m,om_r,k,om_v,H_0=69.7*10**3/(10**6*3.086*10**16)):
    t_low=72*yr
    t_up=10**7*yr
    h=10**5*yr
    rho_c=3*H_0**2/(8*np.pi*G)
    aarr=[]
    tarr=[]
    a0=10**(-5)
    aarr.append(a0)
    rhoarr=[]
    rho0=om_m*rho_c/a0**3
    rhoarr.append(om_m/a0**3)
    tarr.append(t_low)

    for i in np.arange(t_low,t_up,h):
        t1=runge_kutta(freidmann,i,a0,rho0,k,h)
        t2=runge_kutta(fluid,i,rho0,a0,k,h)
        print(t1,t2)
        aarr.append(t1)
        rhoarr.append(t2)
        tarr.append(i)

    plt.plot(tarr,aarr)
    plt.show()
'''
'''
print(show(100,1,0,0,0))
possible_plots(0.27,10**(-5),0,0.73)
#scale_fac_evol(1,0,0,0)


'''

