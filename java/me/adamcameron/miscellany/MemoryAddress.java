package me.adamcameron.miscellany;

import sun.misc.Unsafe;
import java.lang.reflect.Field;

public class MemoryAddress {

	public static Unsafe getUnsafe() throws NoSuchFieldException, IllegalAccessException {
		Field f = Unsafe.class.getDeclaredField("theUnsafe");
		f.setAccessible(true);
		return (Unsafe)f.get(null);
	}

	public static void printAddresses(String label, Object... objects) throws NoSuchFieldException, IllegalAccessException {
		Unsafe unsafe = getUnsafe();
		System.out.print(label + ": 0x");
		long last = 0;
		int offset = unsafe.arrayBaseOffset(objects.getClass());
		int scale = unsafe.arrayIndexScale(objects.getClass());
	
		switch (scale) {
			case 4:
				//long factor = is64bit ? 8 : 1;
				long factor = 8;
				final long i1 = (unsafe.getInt(objects, offset) & 0xFFFFFFFFL) * factor;
				System.out.print(Long.toHexString(i1));
				last = i1;
				for (int i = 1; i < objects.length; i++) {
					final long i2 = (unsafe.getInt(objects, offset + i * 4) & 0xFFFFFFFFL) * factor;
					if (i2 > last)
						System.out.print(", +" + Long.toHexString(i2 - last));
					else
						System.out.print(", -" + Long.toHexString( last - i2));
					last = i2;
				}
			break;
			case 8:
				throw new AssertionError("Not supported");
		}
		System.out.println();
	}

	public static String getAddressFromArray(Object... objects) throws NoSuchFieldException, IllegalAccessException {
		Unsafe unsafe = getUnsafe();
		int offset = unsafe.arrayBaseOffset(objects.getClass());
		long factor = 8;
		final long i1 = (unsafe.getInt(objects, offset) & 0xFFFFFFFFL) * factor;
		return Long.toHexString(i1);
	}

	public static String getAddress(Object object) throws NoSuchFieldException, IllegalAccessException {
		Object[] objects = {object};
		Unsafe unsafe = getUnsafe();
		int offset = unsafe.arrayBaseOffset(objects.getClass());
		long factor = 8;
		final long i1 = (unsafe.getInt(objects, offset) & 0xFFFFFFFFL) * factor;
		return Long.toHexString(i1);
	}

}