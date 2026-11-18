import { act, renderHook } from '@testing-library/react-native';

import { hydrateAuth, signIn, signOut, useAuth } from '@/core/auth';

const token = { access: 'access-token', refresh: 'refresh-token' };

describe('auth store', () => {
  it('updates subscribed selector hooks on sign in and sign out', () => {
    const status = renderHook(() => useAuth.use.status());
    const currentToken = renderHook(() => useAuth.use.token());

    act(() => signIn(token));
    expect(status.result.current).toBe('signIn');
    expect(currentToken.result.current).toEqual(token);

    act(() => signOut());
    expect(status.result.current).toBe('signOut');
    expect(currentToken.result.current).toBeNull();
  });

  it('signs out when hydrating without a stored token', () => {
    act(() => signIn(token));

    act(() => hydrateAuth());

    expect(useAuth.getState().status).toBe('signOut');
    expect(useAuth.getState().token).toBeNull();
  });
});
